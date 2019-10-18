import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import routes from './Jahia.routes';
import actions from './Jahia.actions';
import {registry} from '@jahia/registry';
import {Jahia} from './Jahia';

const JahiaContainer = () => {
    routes(registry);
    actions(registry);

    return (
        <BrowserRouter basename="/modules/moonstone">
            <Jahia routes={registry.find({type: 'route', target: 'jahia'})}/>
        </BrowserRouter>
    );
};

export default JahiaContainer;
