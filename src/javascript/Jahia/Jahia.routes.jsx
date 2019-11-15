import React from 'react';
import {registry} from '@jahia/registry';
import {Button, PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import Person from '@jahia/moonstone/dist/icons/Person';
import Settings from '@jahia/moonstone/dist/icons/Setting';
import Power from '@jahia/moonstone/dist/icons/Power';

const DocumentationGroup = () => {
    return (
        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={false}>
            <PrimaryNavItem textVariant="caption" url="https://www.jahia.com" label="New at jahia.com"/>
            <PrimaryNavItem textVariant="caption"
                            url="https://academy.jahia.com/jahia-resource-center"
                            label="Documentation"/>
        </PrimaryNavItemsGroup>
    );
};

registry.add('bottomDocNavGroup', {
    type: 'bottomNavGroup',
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
        <PrimaryNavItemsGroup>
            <PrimaryNavItem icon={<Person/>} subtitle={window.contextJsParameters.user.fullname + ' ('+window.contextJsParameters.user.email+')'} label="My Profile" button={button}/>
        </PrimaryNavItemsGroup>
    );
};

registry.add('bottomProfileNavGroup', {
    type: 'bottomNavGroup',
    target: ['nav-root-bottom:1'],
    render: () => <ProfileGroup/>
});

const AdministrationGroup = () => {
    return (
        <PrimaryNavItemsGroup>
            <PrimaryNavItem icon={<Settings/>} label="Administration"/>
        </PrimaryNavItemsGroup>
    );
};

registry.add('bottomAdminNavGroup', {
    type: 'bottomNavGroup',
    target: ['nav-root-bottom:1'],
    render: () => <AdministrationGroup/>
});
