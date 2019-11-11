import React from 'react';
import {registry} from '@jahia/registry';
import {useHistory} from 'react-router-dom';
import {
    PrimaryNavItemsGroup,
    PrimaryNavItem
} from '@jahia/moonstone';
import Feather from '@jahia/moonstone/dist/icons/Feather';
import Apps from '@jahia/moonstone/dist/icons/Collections';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import Workflow from '@jahia/moonstone/dist/icons/Workflow';

// WARNING: This file is used as container for test routes and groups and is not intended to in production

// Test route
registry.add('route-custom-nav', {
    type: 'route',
    target: ['nav-root-top:1'],
    path: '/dashboard',
    defaultPath: '/dashboard',
    render: () => 'Dashboard'
});

registry.add('route-custom-two-nav', {
    type: 'route',
    target: ['nav-root-top:1'],
    path: '/workflows',
    defaultPath: '/workflows',
    render: () => 'Workflows'
});

const Group = () => {
    const history = useHistory();
    return (
        <PrimaryNavItemsGroup>
            <PrimaryNavItem isSelected={history.location.pathname.endsWith('/dashboard')}
                            label="Dashboard" icon={<Bars/>}
                            onClick={() => history.push('/dashboard')}/>
            <PrimaryNavItem isSelected={history.location.pathname.endsWith('/workflows')}
                            label="Workflows" icon={<Workflow/>}
                            onClick={() => history.push('/workflows')}/>
        </PrimaryNavItemsGroup>
    )
};

registry.add('group1', {
    type: 'topNavGroup',
    target: ['nav-root-top:1'],
    render: () => <Group/>
});

// Test route two
registry.add('route-custom-three-nav', {
    type: 'route',
    target: ['nav-root-top:1'],
    path: '/edit-mode',
    defaultPath: '/edit-mode',
    render: () => 'Edit mode'
});

registry.add('route-custom-four-nav', {
    type: 'route',
    target: ['nav-root-top:1'],
    path: '/cmm',
    defaultPath: '/cmm',
    render: () => 'Content & Media Manager'
});

const GroupTwo = () => {
    const history = useHistory();
    return (
        <PrimaryNavItemsGroup>
            <PrimaryNavItem isSelected={history.location.pathname.endsWith('/edit-mode')}
                            label="Edit mode" icon={<Feather/>}
                            onClick={() => history.push('/edit-mode')}/>
            <PrimaryNavItem isSelected={history.location.pathname.endsWith('/cmm')}
                            label="Content & Media Manager" icon={<Apps/>}
                            onClick={() => history.push('/cmm')}/>
        </PrimaryNavItemsGroup>
    )
};

registry.add('group2', {
    type: 'topNavGroup',
    target: ['nav-root-top:1'],
    render: () => <GroupTwo/>
});


