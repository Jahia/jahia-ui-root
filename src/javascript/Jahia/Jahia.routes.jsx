import React from 'react';

function routes(registry) {
    registry.add('route_test', {
        type: 'route',
        target: ['jahia:1'],
        path: '/test',
        defaultPath: '/test/test.html',
        render: <div>Test</div>
    });
}

export default routes;
