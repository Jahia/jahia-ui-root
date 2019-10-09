import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import routes from './Jahia.routes';
import actions from './Jahia.actions';
import {registry} from '@jahia/registry';
import AppLayout from './AppLayout';

const Jahia = () => {
    routes(registry);
    actions(registry);
    return (
        <BrowserRouter basename="/cms/moonstone">
            <AppLayout/>
        </BrowserRouter>
    );
};

export default Jahia;
