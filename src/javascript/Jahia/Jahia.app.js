// Register redux
import React from 'react';
import {ReduxProvider} from './ReduxProvider';
import {batchDispatchMiddleware} from 'redux-batched-actions';
import thunk from 'redux-thunk';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import JahiaContext from './Jahia.context';
import Jahia from './Jahia';
import PrimaryNavGroup from './PrimaryNavGroup';
import {createBrowserHistory} from 'history';

export const jahiaApps = (registry, jahiaCtx) => {
    registry.add('app', 'redux', {
        targets: ['root:1'],
        render: next => (<ReduxProvider jahiaCtx={jahiaCtx}>{next}</ReduxProvider>)
    });
    registry.add('redux-middleware', 'batch', {middleware: batchDispatchMiddleware});
    registry.add('redux-middleware', 'thunk', {middleware: thunk});

    // Connected router
    const history = createBrowserHistory({basename: jahiaCtx.contextPath + jahiaCtx.urlbase});
    registry.add('app', 'router', {
        targets: ['root:2'],
        render: next => <ConnectedRouter history={history}>{next}</ConnectedRouter>
    });
    registry.add('redux-reducer', 'router', {targets: ['root'], reducer: connectRouter(history)});
    registry.add('redux-middleware', 'router', {middleware: routerMiddleware(history)});

    // Jahia Context
    registry.add('app', 'jahiacontext', {
        targets: ['root:3'],
        render: next => <JahiaContext.Provider value={jahiaCtx}>{next}</JahiaContext.Provider>
    });

    registry.add('jahiaContext', 'jahiacontexttype', {
        targets: ['ctx'],
        ctx: JahiaContext
    });

    // UI-root
    registry.add('app', 'jahia', {
        targets: ['root:99'], render: next => (
            <>
                <Jahia routes={registry.find({type: 'route', target: 'nav-root-top'})}
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
