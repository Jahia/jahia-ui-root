import React from 'react';
import {registry} from '@jahia/registry';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {GlobalStyle, LayoutApp, Typography} from '@jahia/moonstone'

export const Jahia = ({routes}) => (
    <>
        <GlobalStyle/>
        <LayoutApp
            navigation={
                <div style={{backgroundColor: 'grey', height: '100%', width: '56px'}}>
                    <Typography variant="page">NAV</Typography>
                    <ul>
                        {routes.map(l => <li><Link to={l.defaultPath}>{l.defaultPath}</Link></li>)}
                    </ul>
                </div>
            }
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

