import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {
    GlobalStyle,
    LayoutApp,
    PrimaryNav
} from '@jahia/moonstone';
import JahiaLogo from './JahiaLogo';
import Star from '@jahia/moonstone/dist/icons/Star';

export const Jahia = ({routes, topNavGroups, bottomNavGroups}) => (
    <>
        <GlobalStyle/>
        <LayoutApp
            navigation={<PrimaryNav
                headerLogo={<JahiaLogo/>}
                headerCaption={'Test environment ' + window.contextJsParameters.locale}
                modeIcon={<Star/>}
                top={topNavGroups.map(g => g.render())}
                bottom={bottomNavGroups.map(g => g.render())}
            />}
            content={
                <Switch>
                    {routes.map(r =>
                        <Route key={r.key} path={r.path} render={r.render}/>
                    )}
                </Switch>
            }
        />
    </>
);

Jahia.propTypes = {
    routes: PropTypes.array,
    topNavGroups: PropTypes.array,
    bottomNavGroups: PropTypes.array
};

