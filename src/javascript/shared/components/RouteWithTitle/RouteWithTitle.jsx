import React from 'react';
import {Route} from 'react-router';
import PropTypes from 'prop-types';

export const RouteWithTitle = ({routeTitle, ...props}) => {
    window.top.document.title = routeTitle;
    return <Route {...props}/>;
};

RouteWithTitle.propTypes = {
    routeTitle: PropTypes.string.isRequired,
    ...Route.propTypes
};
