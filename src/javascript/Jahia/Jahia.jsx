import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {
    GlobalStyle,
    LayoutApp,
    PrimaryNav,
    LayoutModule
} from '@jahia/moonstone';
import JahiaLogo from './JahiaLogo';
import Star from '@jahia/moonstone/dist/icons/Star';
import JahiaContext from './Jahia.context';
import {loadNamespace} from './Jahia.loadNamespace';

/* Es-lint-ignore: react-hooks/rules-of-hooks */
const Jahia = ({routes, topNavGroups, bottomNavGroups}) => {
    const jahiaContext = useContext(JahiaContext);
    const loadingNamespace = loadNamespace('jahia-ui-root');

    if (loadingNamespace) {
        return 'Loading screen';
    }

    console.log('Routes', routes);
    return (
        <>
            <GlobalStyle/>
            <LayoutApp
                navigation={
                    <PrimaryNav
                        headerLogo={<JahiaLogo/>}
                        headerCaption={`${jahiaContext.environment} - ${jahiaContext.locale}`}
                        modeIcon={<Star/>}
                        top={topNavGroups}
                        bottom={bottomNavGroups}
                    />
                }
                content={
                    <LayoutModule
                        content={
                            <Switch>
                                {routes.map(r =>
                                    <Route key={r.key} path={r.path} render={r.render}/>
                                )}
                            </Switch>
                        }
                    />
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

