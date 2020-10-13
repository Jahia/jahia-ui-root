import React, {Suspense, useMemo} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import {useNodeInfo} from '@jahia/data-helper';
import {useSelector} from 'react-redux';

const usePermissionFilter = (navItems, site, language) => {
    const {requiredPermission, requiredPaths} = useMemo(() => {
        const reqPermission = ['jcr:read_default'];
        const reqPaths = [];

        navItems.filter(navItem => navItem.requiredPermission !== undefined).forEach(navItem => {
            if (!reqPermission.includes(navItem.requiredPermission)) {
                reqPermission.push(navItem.requiredPermission);
                if (navItem.requiredPermissionPath === undefined) {
                    reqPaths.push(`/sites/${site}`);
                }
            }

            if (navItem.requiredPermissionPath !== undefined && !reqPaths.includes(navItem.requiredPermissionPath)) {
                reqPaths.push(navItem.requiredPermissionPath);
            }
        });

        if (reqPaths.length === 0) {
            reqPaths.push('/sites/' + site);
        }

        return {requiredPermission: reqPermission, requiredPaths: reqPaths};
    }, [navItems, site]);

    const {loading, nodes, error} = useNodeInfo(
        {paths: requiredPaths, language: language},
        {getPermissions: requiredPermission});

    if (error) {
        console.error('An error occur while getting permissions ' + requiredPermission + ' for nodes ' + requiredPaths, error);
        return [];
    }

    if (loading || !nodes) {
        // Wait for the query to be done.
        return [];
    }

    return navItems.filter(navItem => navItem.requiredPermission === undefined ||
        nodes.find(node => {
            if (navItem.requiredPermissionPath !== undefined) {
                return node.path === navItem.requiredPermissionPath;
            }

            return node.path === '/sites/' + site;
        })[navItem.requiredPermission]);
};

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, target}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const current = useSelector(state => ({language: state.language, site: state.site}));
    const navItems = registry.find({type: 'primary-nav-item', target});
    const filteredNavItems = usePermissionFilter(navItems, current.site, current.language);

    return (
        <Suspense fallback="loading...">
            <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>
                {filteredNavItems.map(item => {
                    if (item.render) {
                        return React.cloneElement(item.render(), {key: item.key});
                    }

                    return (
                        <PrimaryNavItem key={item.key}
                                        role={`${item.key}-menu-item`}
                                        isSelected={history.location.pathname.startsWith(item.path)}
                                        icon={item.icon}
                                        label={t(item.label)}
                                        onClick={() => history.push(item.path)}/>
                    );
                })}
            </PrimaryNavItemsGroup>
        </Suspense>
    );
};

PrimaryNavGroup.defaultProps = {
    isDisplayedWhenCollapsed: true
};

PrimaryNavGroup.propTypes = {
    isDisplayedWhenCollapsed: PropTypes.bool,
    target: PropTypes.string.isRequired
};

export default PrimaryNavGroup;
