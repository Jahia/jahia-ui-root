import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {
    GlobalStyle,
    LayoutApp,
    PrimaryNav
} from '@jahia/moonstone';
import JahiaLogo from './JahiaLogo';
import Star from '@jahia/moonstone/dist/icons/Star';
import JahiaContext from './Jahia.context';

window.navRoot = PrimaryNav;
window.reactRoot = React;

export const Jahia = ({routes, topNavGroups, bottomNavGroups}) => {
    const jahiaContext = useContext(JahiaContext);
    return (
        <>
            <GlobalStyle/>
            <LayoutApp
                navigation={<PrimaryNav
                    headerLogo={<JahiaLogo/>}
                    headerCaption={`${jahiaContext.environment} - ${window.contextJsParameters.locale}`}
                    modeIcon={<Star/>}
                    top={topNavGroups}
                    bottom={bottomNavGroups}
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
};

Jahia.propTypes = {
    routes: PropTypes.array,
    topNavGroups: PropTypes.array,
    bottomNavGroups: PropTypes.array
};

