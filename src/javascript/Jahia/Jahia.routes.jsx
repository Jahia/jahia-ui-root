import React from 'react';
import TestWithoutNav from './TestWithoutNav';
import TestWithNav from './TestWithNav';

function routes(registry) {
    registry.add('route-test-nav', {
        type: 'route',
        target: ['jahia:1'],
        path: '/test-nav',
        defaultPath: '/test-nav',
        render: () => <TestWithNav/>
    });

    registry.add('route-test-nonav', {
        type: 'route',
        target: ['jahia:1'],
        path: '/test-nonav',
        defaultPath: '/test-nonav',
        render: () => <TestWithoutNav/>
    });
}

export default routes;
