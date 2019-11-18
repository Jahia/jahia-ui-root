import React from 'react';
import {registry} from '@jahia/registry';
import {PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import Person from '@jahia/moonstone/dist/icons/Person';
import Settings from '@jahia/moonstone/dist/icons/Setting';

const DocumentationGroup = () => {
    return (
        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={false}>
            <PrimaryNavItem textVariant="caption" url={window.contextJsParameters.links.whatsNew} label="New at jahia.com"/>
            <PrimaryNavItem textVariant="caption"
                            url={window.contextJsParameters.links.documentation}
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
    return (
        <PrimaryNavItemsGroup>
            <PrimaryNavItem icon={<Person/>} label="My Profile"/>
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
            <PrimaryNavItem icon={<Settings/>} subtitle="root@jahia.com" label="Administration"/>
        </PrimaryNavItemsGroup>
    );
};

registry.add('bottomAdminNavGroup', {
    type: 'bottomNavGroup',
    target: ['nav-root-bottom:1'],
    render: () => <AdministrationGroup/>
});
