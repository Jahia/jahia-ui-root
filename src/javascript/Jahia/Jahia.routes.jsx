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
            <PrimaryNavItem url={window.contextJsParameters.links.whatsNew} label={t('jahia-ui-root:primaryNavigation.documentation.newAtJahia')}/>
            <PrimaryNavItem url={window.contextJsParameters.links.documentation} label={t('jahia-ui-root:primaryNavigation.documentation.label')}/>
        </>
    );
};

registry.add('bottomDocumentationGroup', 'bottomDocNavGroup', {
    targets: ['nav-root-bottom:1'],
    render: () => <DocumentationGroup key="bottomDocumentationGroup"/>
});

export const ProfileGroup = () => {
    const {t} = useTranslation();
    let button = (
        <Button icon={<Power/>}
                variant="ghost"
                color="reverse"
                label={t('jahia-ui-root:primaryNavigation.profile.signOut')}
                onClick={() => {
                    console.log('test');
                    window.location.assign('/cms/logout?redirect=/start');
                }}/>
    );
    return (
        <PrimaryNavItem icon={<Person/>} subtitle={window.contextJsParameters.user.fullname + ' (' + window.contextJsParameters.user.email + ')'} label={t('jahia-ui-root:primaryNavigation.profile.label')} button={button}/>
    );
};

registry.add('bottomProfileGroup', 'bottomProfileNavGroup', {
    targets: ['nav-root-bottom:1'],
    render: () => <ProfileGroup key="bottomProfileGroup"/>
});
