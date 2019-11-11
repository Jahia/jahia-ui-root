import React from 'react';
import {registry} from '@jahia/registry';
import {PrimaryNavItem, PrimaryNavItemsGroup} from "@jahia/moonstone";

const DocumentationGroup = () => {
    return (
        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={false}>
            <PrimaryNavItem variant="link" label="New at jahia.com"/>
            <PrimaryNavItem variant="link" label="Documentation"/>
        </PrimaryNavItemsGroup>
    )
};

registry.add('bottomDocNavGroup', {
    type: 'bottomNavGroup',
    target: ['nav-root-bottom:1'],
    render: () => <DocumentationGroup/>
});
