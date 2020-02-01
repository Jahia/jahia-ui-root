import React from 'react';
import {Provider} from 'react-redux';
import {registry} from '@jahia/ui-extender';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import PropTypes from 'prop-types';

export const ReduxProvider = ({children}) => {
    const reducersArray = registry.find({type: 'redux-reducer'});
    const reducerObj = {};
    reducersArray.forEach(r => {
        reducerObj[r.key] = r.reducer;
    });

    const rootReducer = combineReducers(reducerObj);

    const composeEnhancers = window.top.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = registry.find({type: 'redux-middleware'}).map(m => m.middleware);

    const enhancer = composeEnhancers(applyMiddleware.apply(this, middlewares));
    const store = createStore(rootReducer, enhancer);

    const listeners = registry.find({type: 'redux-listener'}).map(l => l.createListener(store));
    listeners.forEach(l => store.subscribe(l));

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

ReduxProvider.propTypes = {
    children: PropTypes.element.isRequired
};

