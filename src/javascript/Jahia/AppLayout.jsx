import React, {useState} from 'react';
import {registry} from '@jahia/registry';
import {Route, Switch} from 'react-router';
import classnames from 'classnames';
import css from './AppLayout.scss';
import {Typography} from '@jahia/moonstone'

const AppLayout = () => {
    const routes = registry.find({type: 'route', target: 'jahia'});
    const links = routes.map(r => r.defaultPath);

    const [open, setOpen] = useState(false);

    return (
        <div className={css.AppLayout}>
            <div className={classnames(css.AppLayout_nav, {[css.open]: open, [css.close]: !open})}>


            </div>
            <div className={css.AppLayout_main}>
                <Typography variant="page">Page</Typography>

                <Switch>
                    {routes.map(r =>
                        <Route key={r.key} path={r.path} render={r.render}/>
                    )}
                </Switch>
            </div>
        </div>
    );
};

export default AppLayout;
