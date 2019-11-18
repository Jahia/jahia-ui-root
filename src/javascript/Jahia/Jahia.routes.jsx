import React from 'react';
import {registry} from '@jahia/registry';
import {PrimaryNavItem} from '@jahia/moonstone';
import Person from '@jahia/moonstone/dist/icons/Person';
import Settings from '@jahia/moonstone/dist/icons/Setting';

const DocumentationGroup = () => {
    return (
        <>
            <PrimaryNavItem url="https://www.jahia.com" label="New at jahia.com"/>
            <PrimaryNavItem url="https://academy.jahia.com/jahia-resource-center" label="Documentation"/>
        </>
    );
};

registry.add('bottomDocNavGroup', {
    type: 'bottomDocumentationGroup',
    target: ['nav-root-bottom:1'],
    render: () => <DocumentationGroup/>
});

const ProfileGroup = () => {
    return (
        <PrimaryNavItem icon={<Person/>} label="My Profile"/>
    );
};

registry.add('bottomProfileNavGroup', {
    type: 'bottomProfileGroup',
    target: ['nav-root-bottom:1'],
    render: () => <ProfileGroup/>
});

const AdministrationGroup = () => {
    return (
        <PrimaryNavItem icon={<Settings/>} subtitle="root@jahia.com" label="Administration"/>
    );
};

registry.add('bottomAdminNavGroup', {
    type: 'bottomAdminGroup',
    target: ['nav-root-bottom:1'],
    render: () => <AdministrationGroup/>
});
