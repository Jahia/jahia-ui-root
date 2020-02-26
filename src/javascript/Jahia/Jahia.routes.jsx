import React from 'react';
import {registry} from '@jahia/ui-extender';
import {Button, PrimaryNavItem} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import Person from '@jahia/moonstone/dist/icons/Person';
import Power from '@jahia/moonstone/dist/icons/Power';

// TODO separate into different folders
export const DocumentationGroup = () => {
    const {t} = useTranslation();
    return (
        <>
            <PrimaryNavItem url={window.contextJsParameters.links.whatsNew}
                            label={t('jahia-ui-root:primaryNavigation.documentation.newAtJahia')}/>
            <PrimaryNavItem url={window.contextJsParameters.links.documentation}
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
        <PrimaryNavItem icon={<Person/>}
                        subtitle={window.contextJsParameters.user.fullname + ' (' + window.contextJsParameters.user.email + ')'}
                        label={t('jahia-ui-root:primaryNavigation.profile.label')}
                        button={button}/>
    );
};

registry.add('primary-nav-item', 'bottomProfileNavGroup', {
    targets: ['nav-root-profile:1'],
    render: () => <ProfileGroup/>
});
