import React from 'react';
import {Route} from 'react-router';
import {Route as V6Route, Routes, UNSAFE_RouteContext as RouteContext} from 'react-router-dom-v5-compat';
import PropTypes from 'prop-types';
import {toCompatPath} from './toCompatPath';

// Without a parent route, react-router 6 matches an absolute path against the full URL
const rootRouteContext = {outlet: null, matches: [], isDataRoute: false};

export const RouteWithTitle = ({routeTitle, ...props}) => {
    window.top.document.title = routeTitle;
    const compatPath = toCompatPath(props.path);
    if (compatPath === null) {
        return <Route {...props}/>;
    }

    return (
        <RouteContext.Provider value={rootRouteContext}>
            <Routes location={props.location}>
                <V6Route path={props.exact ? compatPath : `${compatPath}/*`} element={<Route {...props}/>}/>
            </Routes>
        </RouteContext.Provider>
    );
};

RouteWithTitle.propTypes = {
    routeTitle: PropTypes.string.isRequired,
    ...Route.propTypes
};
