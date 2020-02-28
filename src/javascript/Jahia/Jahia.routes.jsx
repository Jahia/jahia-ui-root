import React from 'react';
import {useSelector} from 'react-redux';
import {useSiteInfo} from '@jahia/data-helper';
import {registry} from '@jahia/ui-extender';
import {Button, PrimaryNavItem} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import Person from '@jahia/moonstone/dist/icons/Person';
import Power from '@jahia/moonstone/dist/icons/Power';

const uiLangRegexp = /\$ui-lang\(\[([-a-zA-Z,]+)\],([-a-zA-Z]+)\)/g

const transformLink = (link, siteInfo, displayLanguage) => {
    link = link.replace('$site-servername', siteInfo.serverName);
    link = link.replace('$dx-version', window.contextJsParameters.version);

    let match = uiLangRegexp.exec(link);
    while (match !== null) {
        if (match[1].split(',').includes(displayLanguage)) {
            link = link.replace(match[0], displayLanguage);
        } else {
            link = link.replace(match[0], match[2]);
        }

        match = uiLangRegexp.exec(link);
    }
    return link;
};

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

export const ProfileGroup = () => {
    const {t} = useTranslation();
    let button = (
        <Button isReversed
                icon={<Power/>}
                variant="ghost"
                label={t('jahia-ui-root:primaryNavigation.profile.signOut')}
                onClick={() => {
                    let url = window.contextJsParameters.contextPath + '/cms/logout?redirect=' + window.contextJsParameters.contextPath + '/start';
                    window.location.assign(url);
                }}/>
    );
    return (
        <PrimaryNavItem role="profile-menu-item"
                        icon={<Person/>}
                        subtitle={window.contextJsParameters.user.fullname + ' (' + window.contextJsParameters.user.email + ')'}
                        label={t('jahia-ui-root:primaryNavigation.profile.label')}
                        button={button}/>
    );
};

registry.add('primary-nav-item', 'bottomProfileNavGroup', {
    targets: ['nav-root-profile:1'],
    render: () => <ProfileGroup/>
});
