import React from 'react';
import {Provider} from 'react-redux';
import {registry} from '@jahia/ui-extender';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {batchDispatchMiddleware} from 'redux-batched-actions';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

export const ReduxProvider = ({jahiaCtx, children}) => {
    console.log(jahiaCtx);
    // TODO const history = createBrowserHistory({basename: jahiaCtx.contextPath + jahiaCtx.urlbase});
    const reducersArray = registry.find({type: 'redux-reducer'});
    const reducerObj = {};
    reducersArray.forEach(r => {
        reducerObj[r.key] = r.reducer;
    });

    const rootReducer = combineReducers(reducerObj);

    const composeEnhancers = window.top.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const enhancer = composeEnhancers(
        applyMiddleware(
            // RouterMiddleware(history),
            batchDispatchMiddleware,
            thunk
        )
    );

    return (
        <Provider store={createStore(rootReducer, enhancer)}>
            {children}
        </Provider>
    );
};

ReduxProvider.propTypes = {
    jahiaCtx: PropTypes.object.isRequired,

    children: PropTypes.element.isRequired
};

