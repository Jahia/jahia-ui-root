import React, {useEffect} from 'react';
import {Switch, useHistory, useRouteMatch} from 'react-router';
import {useTranslation} from 'react-i18next';
import {LayoutModule} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {shallowEqual, useSelector} from 'react-redux';
import {ErrorBoundary, getIframeRenderer, LoaderSuspense, RouteWithTitle} from '../shared';
import {usePermissionFilter} from '../shared/hooks';
import TaxonomyNavigation from './TaxonomyNavigation';
import {TAXONOMY_ACCORDION_TARGET, TAXONOMY_ACCORDION_TYPE, TAXONOMY_ROUTE} from './Taxonomy.constants';

/**
 * An entry either brings its own renderer, or simply names a page to frame - the same two ways an
 * adminRoute is rendered. The second is what the legacy server-rendered panels need, and it lets a
 * module contribute one without importing anything from here.
 */
const renderEntry = (item, routeProps) => {
    if (item.routeRender) {
        return item.routeRender(routeProps, item);
    }

    if (item.iframeUrl) {
        return getIframeRenderer(item.iframeUrl);
    }

    return null;
};

export const Taxonomy = () => {
    const {t} = useTranslation('jahia-ui-root');
    const history = useHistory();
    const match = useRouteMatch(`${TAXONOMY_ROUTE}/:key`);
    const current = useSelector(state => ({language: state.language, site: state.site}), shallowEqual);
    const items = usePermissionFilter(
        registry.find({type: TAXONOMY_ACCORDION_TYPE, target: TAXONOMY_ACCORDION_TARGET}),
        current.site,
        current.language).filter(item => !item.isEnabled || item.isEnabled());

    const openedItem = match?.params?.key;
    const activeItem = items.find(item => item.key === openedItem);

    // An entry may own its own navigation (deep link, restored location, ...); otherwise just go to its base path
    const selectItem = item => {
        if (item.onSelect) {
            item.onSelect(item);
        } else {
            history.push(`${TAXONOMY_ROUTE}/${item.key}`);
        }
    };

    // Landing on /taxonomy (or on an entry that is no longer registered) opens the first available one
    const fallback = activeItem ? undefined : items[0];
    useEffect(() => {
        if (fallback) {
            if (fallback.onSelect) {
                fallback.onSelect(fallback);
            } else {
                history.replace(`${TAXONOMY_ROUTE}/${fallback.key}`);
            }
        }
    }, [fallback, history]);

    return (
        <LayoutModule
            navigation={
                <TaxonomyNavigation items={items}
                                    openedItem={openedItem}
                                    navHeader={activeItem?.renderNavHeader?.(activeItem)}
                                    onSelectItem={key => selectItem(items.find(item => item.key === key))}/>
            }
            content={
                <LoaderSuspense>
                    <ErrorBoundary>
                        <Switch>
                            {items.map(item => (
                                <RouteWithTitle key={item.key}
                                                routeTitle={`Jahia - ${t(item.label)}`}
                                                path={`${TAXONOMY_ROUTE}/${item.key}`}
                                                render={props => renderEntry(item, props)}/>
                            ))}
                        </Switch>
                    </ErrorBoundary>
                </LoaderSuspense>
            }
        />
    );
};

export default Taxonomy;
