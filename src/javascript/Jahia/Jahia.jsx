import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {GlobalStyle, LayoutApp, PrimaryNav} from '@jahia/moonstone';
import JahiaLogo from './JahiaLogo';
import Star from '@jahia/moonstone/dist/icons/Star';
import {useNodeInfo} from '@jahia/data-helper';

const Jahia = ({routes, topNavGroups, bottomNavGroups}) => {
    const requiredPermission = ['jcr:read_default'];
    const requiredPaths = [];
    routes.filter(route => route.requiredPermission !== undefined).forEach(route => {
        if (!requiredPermission.includes(route.requiredPermission)) {
            requiredPermission.push(route.requiredPermission);
        }

        if (route.requiredPermissionPath !== undefined && !requiredPaths.includes(route.requiredPermissionPath)) {
            requiredPaths.push(route.requiredPermissionPath);
        }
    });
    if (requiredPaths.length === 0) {
        requiredPaths.push('/sites/' + window.contextJsParameters.siteKey);
    }

    const permissions = useNodeInfo({paths: requiredPaths, language: 'en'}, {getPermissions: requiredPermission});
    if (permissions.loading === true || permissions.nodes === null) {
        return null;
    }

    let primaryNav;
    if (window.contextJsParameters.config.environment === '') {
        primaryNav = (
            <PrimaryNav
                headerLogo={<JahiaLogo/>}
                top={topNavGroups}
                bottom={bottomNavGroups}
            />
        );
    } else {
        primaryNav = (
            <PrimaryNav
                headerLogo={<JahiaLogo/>}
                headerCaption={`${window.contextJsParameters.config.environment}`}
                modeIcon={<Star/>}
                top={topNavGroups}
                bottom={bottomNavGroups}
            />
        );
    }

    return (
        <>
            <GlobalStyle/>
            <LayoutApp
                navigation={primaryNav}
                content={
                    <Switch>
                        {routes.filter(route => route.requiredPermission === undefined ||
                            permissions.nodes.find(node => {
                                if (route.requiredPermissionPath !== undefined) {
                                    return node.path === route.requiredPermissionPath;
                                }

                                return node.path === '/sites/' + window.contextJsParameters.siteKey;
                            })[route.requiredPermission]).map(r =>
                                <Route key={r.key} path={r.path} render={r.render}/>
                        )}
                    </Switch>
                }
            />
        </>
    );
};

Jahia.propTypes = {
    routes: PropTypes.array,
    topNavGroups: PropTypes.array,
    bottomNavGroups: PropTypes.array
};

export default Jahia;
