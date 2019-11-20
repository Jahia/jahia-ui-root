import React from 'react';
import {registry} from '@jahia/registry';
import {Button, PrimaryNavItem} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import Person from '@jahia/moonstone/dist/icons/Person';
import Settings from '@jahia/moonstone/dist/icons/Setting';
import Power from '@jahia/moonstone/dist/icons/Power';

// TODO separate into different folders
const DocumentationGroup = () => {
    const {t} = useTranslation();
    return (
        <>
            <PrimaryNavItem url={window.contextJsParameters.links.whatsNew} label={t('primaryNavigation.documentation.newAtJahia')}/>
            <PrimaryNavItem url={window.contextJsParameters.links.documentation} label={t('primaryNavigation.documentation.label')}/>
        </>
    );
};

registry.add('bottomDocNavGroup', {
    type: 'bottomDocumentationGroup',
    target: ['nav-root-bottom:1'],
    render: () => <DocumentationGroup/>
});

const ProfileGroup = () => {
    const {t} = useTranslation();
    let button = (
        <Button icon={<Power/>}
                variant="ghost"
                color="reverse"
                label={t('primaryNavigation.profile.signOut')}
                onClick={() => {
                    console.log('test');
                    window.location.assign('/cms/logout?redirect=/start');
                }}/>
    );
    return (
        <PrimaryNavItem icon={<Person/>} subtitle={window.contextJsParameters.user.fullname + ' (' + window.contextJsParameters.user.email + ')'} label={t('primaryNavigation.profile.label')} button={button}/>
    );
};

registry.add('bottomProfileNavGroup', {
    type: 'bottomProfileGroup',
    target: ['nav-root-bottom:1'],
    render: () => <ProfileGroup/>
});

const AdministrationGroup = () => {
    const {t} = useTranslation();
    return (
        <PrimaryNavItem icon={<Settings/>} label={t('primaryNavigation.administration.label')}/>
    );
};

registry.add('bottomAdminNavGroup', {
    type: 'bottomAdminGroup',
    target: ['nav-root-bottom:1'],
    render: () => <AdministrationGroup/>
});
