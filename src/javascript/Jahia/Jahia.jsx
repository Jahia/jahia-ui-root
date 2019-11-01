import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {
    GlobalStyle,
    LayoutApp,
    PrimaryNav,
    PrimaryNavItem,
    PrimaryNavItemsGroup
} from '@jahia/moonstone';

export const Jahia = ({routes}) => (
    <>
        <GlobalStyle/>
        <LayoutApp
            navigation={<PrimaryNav
                headerLogo={<img src="logo.gif"/>}
                headerCaption="development"
                top={
                    <>
                        <PrimaryNavItemsGroup>
                            <PrimaryNavItem label="NavItem not selected" icon="hello"/>
                            <PrimaryNavItem isSelected label="NavItem selected" icon="there"/>
                        </PrimaryNavItemsGroup>
                        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={false}>
                            <PrimaryNavItem variant="link" label="Link"/>
                        </PrimaryNavItemsGroup>
                    </>
                }
                bottom={
                    <>
                        <PrimaryNavItemsGroup>
                            <PrimaryNavItem label="Bottom item" icon="You"/>
                        </PrimaryNavItemsGroup>
                    </>
                }
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

