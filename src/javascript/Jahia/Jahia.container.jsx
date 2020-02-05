import React from 'react';
import PropTypes from 'prop-types';
import {registry} from '@jahia/ui-extender';
import Jahia from './Jahia';
import PrimaryNavGroup from './PrimaryNavGroup';
import JahiaContext from './Jahia.context';
import './Jahia.routes';
import './Workflow/Workflow.routes';
import {ReduxProvider} from './ReduxProvider';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {batchDispatchMiddleware} from 'redux-batched-actions';
import thunk from 'redux-thunk';

const JahiaContainer = ({jahiaCtx}) => {
    const history = createBrowserHistory({basename: jahiaCtx.contextPath + jahiaCtx.urlbase});

    // Register redux
    registry.add('app', 'redux', {
        targets: ['root:1'],
        render: next => (<ReduxProvider jahiaCtx={jahiaCtx}>{next}</ReduxProvider>)
    });
    registry.add('redux-middleware', 'batch', {middleware: batchDispatchMiddleware});
    registry.add('redux-middleware', 'thunk', {middleware: thunk});

    // Connected router
    registry.add('app', 'router', {
        targets: ['root:2'],
        render: next => <ConnectedRouter history={history}>{next}</ConnectedRouter>
    });
    registry.add('redux-reducer', 'router', {reducer: connectRouter(history)});
    registry.add('redux-middleware', 'router', {middleware: routerMiddleware(history)});

    // Jahia Context
    registry.add('app', 'jahiacontext', {
        targets: ['root:3'],
        render: next => <JahiaContext.Provider value={jahiaCtx}>{next}</JahiaContext.Provider>
    });

    // UI-root
    registry.add('app', 'jahia', {
        targets: ['root:99'], render: next => (
            <>
                <Jahia routes={registry.find({type: 'route', target: 'nav-root-top'})}
                       topNavGroups={[
                           <PrimaryNavGroup key="workflowNavGroup"
                                            navItems={registry.find({
                                                type: 'workflowGroup',
                                                target: 'nav-root-workflow'
                                            })}/>,
                           <PrimaryNavGroup key="topNavGroup"
                                            navItems={registry.find({
                                                type: 'topNavGroup',
                                                target: 'nav-root-top'
                                            })}/>
                       ]}
                       bottomNavGroups={[
                           <PrimaryNavGroup key="bottomDocumentationGroup"
                                            isDisplayedWhenCollapsed={false}
                                            navItems={registry.find({
                                                type: 'bottomDocumentationGroup',
                                                target: 'nav-root-bottom'
                                            })}/>,
                           <PrimaryNavGroup key="bottomProfileGroup"
                                            navItems={registry.find({
                                                type: 'bottomProfileGroup',
                                                target: 'nav-root-bottom'
                                            })}/>,
                           <PrimaryNavGroup key="bottomAdminGroup"
                                            navItems={registry.find({
                                                type: 'bottomAdminGroup',
                                                target: 'nav-root-bottom'
                                            })}/>
                       ]}
                />
                {next}
            </>
        )
    });

    // App shell
    const apps = registry.find({type: 'app', target: 'root'}).map(m => m.render);
    const render = apps.reduceRight((prevFn, nextFn) =>
        (...args) => nextFn(prevFn(...args)),
    value => value
    );

    return render();
};

JahiaContainer.propTypes = {
    jahiaCtx: PropTypes.object
};

export default JahiaContainer;
