import React from 'react';
import {registry} from '@jahia/registry';
import {Button, PrimaryNavItem} from '@jahia/moonstone';
import Person from '@jahia/moonstone/dist/icons/Person';
import Settings from '@jahia/moonstone/dist/icons/Setting';
import Power from '@jahia/moonstone/dist/icons/Power';

const DocumentationGroup = () => {
    return (
        <>
            <PrimaryNavItem url={window.contextJsParameters.links.whatsNew} label="New at jahia.com"/>
            <PrimaryNavItem url={window.contextJsParameters.links.documentation} label="Documentation"/>
        </>
    );
};

registry.add('bottomDocNavGroup', {
    type: 'bottomDocumentationGroup',
    target: ['nav-root-bottom:1'],
    render: () => <DocumentationGroup/>
});

const ProfileGroup = () => {
    let button = (
        <Button icon={<Power/>}
                variant="ghost"
                color="reverse"
                label="Sign out"
                onClick={() => {
                    console.log('test');
                    window.location.assign('/cms/logout?redirect=/start');
                }}/>
    );
    return (
        <PrimaryNavItem icon={<Person/>} subtitle={window.contextJsParameters.user.fullname + ' (' + window.contextJsParameters.user.email + ')'} label="My Profile" button={button}/>
    );
};

registry.add('bottomProfileNavGroup', {
    type: 'bottomProfileGroup',
    target: ['nav-root-bottom:1'],
    render: () => <ProfileGroup/>
});

const AdministrationGroup = () => {
    return (
        <PrimaryNavItem icon={<Settings/>} label="Administration"/>
    );
};

registry.add('bottomAdminNavGroup', {
    type: 'bottomAdminGroup',
    target: ['nav-root-bottom:1'],
    render: () => <AdministrationGroup/>
});
