import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import actions from './Jahia.actions';
import {registry} from '@jahia/registry';
import {Jahia} from './Jahia';
import './Jahia.routes';

// TODO Remove eventually
import './TestRoutes';

const JahiaContainer = () => {
    actions(registry);

    return (
        <BrowserRouter basename="/modules/moonstone">
            <Jahia routes={registry.find({type: 'route', target: 'nav-root-top'})}
                   topNavGroups={registry.find({type: 'topNavGroup', target: 'nav-root-top'})}
                   bottomNavGroups={registry.find({type: 'bottomNavGroup', target: 'nav-root-bottom'})}
            />
        </BrowserRouter>
    );
};

export default JahiaContainer;
