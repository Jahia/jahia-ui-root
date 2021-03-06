// Register redux
import React from 'react';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import {ComponentRendererProvider} from '@jahia/ui-extender';

import Jahia from './Jahia';
import PrimaryNavGroup from './Jahia/PrimaryNavGroup';
import {createBrowserHistory} from 'history';

export const jahiaApps = (registry, jahiaCtx) => {
    // Connected router
    const history = createBrowserHistory({basename: jahiaCtx.urlbase});

    if (window.jahia) {
        window.jahia.routerHistory = history;
    }

    registry.add('app', 'router', {
        targets: ['root:2'],
        render: next => <ConnectedRouter history={history}>{next}</ConnectedRouter>
    });
    registry.add('app', 'component-renderer', {
        targets: ['root:16'],
        render: next => (<ComponentRendererProvider>{next}</ComponentRendererProvider>)
    });

    registry.add('redux-reducer', 'router', {targets: ['root'], reducer: connectRouter(history)});
    registry.add('redux-middleware', 'router', {targets: ['root:3'], middleware: routerMiddleware(history)});

    // UI-root
    registry.add('app', 'jahia', {
        targets: ['root:99'], render: next => (
            <>
                <Jahia routes={registry.find({type: 'route', target: 'main'})}
                       topNavGroups={[
                           <PrimaryNavGroup key="workflowNavGroup" target="nav-root-tasks"/>,
                           <PrimaryNavGroup key="topNavGroup" target="nav-root-top"/>
                       ]}
                       bottomNavGroups={[
                           <PrimaryNavGroup key="bottomDocumentationGroup" isDisplayedWhenCollapsed={false} target="nav-root-documentation"/>,
                           <PrimaryNavGroup key="bottomProfileGroup" target="nav-root-profile"/>,
                           <PrimaryNavGroup key="bottomAdminGroup" target="nav-root-admin"/>
                       ]}
                />
                {next}
            </>
        )
    });
};
