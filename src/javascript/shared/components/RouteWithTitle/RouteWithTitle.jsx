import React from 'react';
import {Route} from 'react-router';
import {Route as V6Route, Routes, UNSAFE_RouteContext as RouteContext, useInRouterContext} from 'react-router-dom-v5-compat';
import PropTypes from 'prop-types';
import {toCompatPath} from './RouteWithTitle.utils';

// Without a parent route, react-router 6 matches an absolute path against the full URL
const rootRouteContext = {outlet: null, matches: [], isDataRoute: false};

export const RouteWithTitle = ({routeTitle, ...props}) => {
    window.top.document.title = routeTitle;
    const inV6Router = useInRouterContext();
    const path = Array.isArray(props.path) ? props.path[0] : props.path;
    const compatPath = toCompatPath(path);
    if (compatPath === null || !inV6Router) {
        return <Route {...props}/>;
    }

    // The v5 Route keeps the original path: jahia-administration reads match.params[0], which only `/administration*` gives
    const v5Route = <Route {...props}/>;
    return (
        <RouteContext.Provider value={rootRouteContext}>
            <Routes location={props.location}>
                <V6Route path={props.exact && !path.endsWith('*') ? compatPath : `${compatPath}/*`} element={v5Route}/>
                <V6Route path="*" element={v5Route}/>
            </Routes>
        </RouteContext.Provider>
    );
};

RouteWithTitle.propTypes = {
    routeTitle: PropTypes.string.isRequired,
    ...Route.propTypes
};
