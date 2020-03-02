import React from 'react';
import {useSelector} from 'react-redux';
import {useSiteInfo} from '@jahia/data-helper';
import {registry} from '@jahia/ui-extender';
import {PrimaryNavItem} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {transformLink} from './links.utils';

// TODO separate into different folders
export const DocumentationGroup = () => {
    const {t} = useTranslation();
    const {siteKey, displayLanguage} = useSelector(state => ({displayLanguage: state.uilang, siteKey: state.site}));
    const {siteInfo} = useSiteInfo({siteKey, displayLanguage});

    let links = window.contextJsParameters.config.links;

    return (
        <>
            <PrimaryNavItem url={transformLink(links.whatsNew, siteInfo, displayLanguage)}
                            label={t('jahia-ui-root:primaryNavigation.documentation.newAtJahia')}/>
            <PrimaryNavItem url={transformLink(links.documentation, siteInfo, displayLanguage)}
                            label={t('jahia-ui-root:primaryNavigation.documentation.label')}/>
        </>
    );
};

registry.add('primary-nav-item', 'bottomDocNavGroup', {
    targets: ['nav-root-documentation:1'],
    render: () => <DocumentationGroup/>
});
