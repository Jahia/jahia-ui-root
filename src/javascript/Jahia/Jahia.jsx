import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {
    GlobalStyle,
    LayoutApp,
    PrimaryNav
} from '@jahia/moonstone';
import JahiaLogo from './JahiaLogo';
// TODO fix this
import Star from '@jahia/moonstone/dist/icons/Star';

export const Jahia = ({routes}) => (
    <>
        <GlobalStyle/>
        <LayoutApp
            navigation={<PrimaryNav
                headerLogo={<JahiaLogo/>}
                headerCaption="Test environment"
                modeIcon={<Star/>}
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
    routes: PropTypes.array
};

