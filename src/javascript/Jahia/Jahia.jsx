import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {GlobalStyle, LayoutApp, PrimaryNav, Star} from '@jahia/moonstone';
import JahiaLogo from '../JahiaLogo';
import {useNodeInfo} from '@jahia/data-helper';
import {useSelector} from 'react-redux';
import {LoginCheck} from './LoginCheck';
import {ErrorBoundary, LoaderSuspense} from '../shared';

const Jahia = ({routes, topNavGroups, bottomNavGroups}) => {
    const current = useSelector(state => ({language: state.language, site: state.site}));
    const requiredPermission = ['jcr:read_default'];
    const requiredPaths = [];
    routes.filter(route => route.requiredPermission !== undefined).forEach(route => {
        if (!requiredPermission.includes(route.requiredPermission)) {
            requiredPermission.push(route.requiredPermission);
            if (route.requiredPermissionPath === undefined) {
                requiredPaths.push(`/sites/${current.site}`);
            }
        }

        if (route.requiredPermissionPath !== undefined && !requiredPaths.includes(route.requiredPermissionPath)) {
            requiredPaths.push(route.requiredPermissionPath);
        }
    });
    if (requiredPaths.length === 0) {
        requiredPaths.push(`/sites/${current.site}`);
    }

    const {loading, nodes, error} = useNodeInfo({
        paths: requiredPaths,
        language: current.language
    }, {getPermissions: requiredPermission});

    if (error) {
        console.error('Jahia - An error occur while getting permissions', error);
        return null;
    }

    if (loading || !nodes) {
        // Wait for the query to be done.
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

    const filteredRoutes = routes.filter(route => {
        if (!route.requiredPermission) {
            return true;
        }

        const permissionNode = nodes.find(node => {
            if (route.requiredPermissionPath !== undefined) {
                return node.path === route.requiredPermissionPath;
            }

            return node.path === `/sites/${current.site}`;
        });

        return permissionNode && permissionNode[route.requiredPermission];
    });

    return (
        <>
            <GlobalStyle/>
            <LoginCheck/>
            <LayoutApp
                navigation={primaryNav}
                content={
                    <LoaderSuspense>
                        <Switch>
                            {filteredRoutes.map(r => (
                                <Route key={r.key}
                                       path={r.path}
                                       render={p => (
                                           <ErrorBoundary>{r.render(p)}</ErrorBoundary>
                                       )}
                                />
                            ))}
                        </Switch>
                    </LoaderSuspense>
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
