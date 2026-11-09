import React from 'react';
import {PrimaryNavItem} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router';
import {shallowEqual, useSelector} from 'react-redux';
import {usePermissionFilter} from '../shared/hooks';
import TaxonomyIcon from './TaxonomyIcon';
import {TAXONOMY_ACCORDION_TARGET, TAXONOMY_ACCORDION_TYPE, TAXONOMY_ROUTE} from './Taxonomy.constants';

export const TaxonomyNavItem = props => {
    const {t} = useTranslation('jahia-ui-root');
    const history = useHistory();
    const {pathname} = useLocation();
    const current = useSelector(state => ({language: state.language, site: state.site}), shallowEqual);

    // Taxonomy is only a container: hide it entirely unless the user can reach at least one level 2 entry
    const items = usePermissionFilter(
        registry.find({type: TAXONOMY_ACCORDION_TYPE, target: TAXONOMY_ACCORDION_TARGET}),
        current.site,
        current.language).filter(item => !item.isEnabled || item.isEnabled());
    if (items.length === 0) {
        return null;
    }

    return (
        <PrimaryNavItem {...props}
                        isSelected={pathname.startsWith(TAXONOMY_ROUTE)}
                        icon={<TaxonomyIcon/>}
                        label={t('jahia-ui-root:taxonomy.label')}
                        onClick={() => history.push(TAXONOMY_ROUTE)}/>
    );
};

export default TaxonomyNavItem;
