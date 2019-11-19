import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import actions from './Jahia.actions';
import {registry} from '@jahia/registry';
import {Jahia} from './Jahia';
import PrimaryNavGroup from './PrimaryNavGroup';
import './Jahia.routes';

const JahiaContainer = () => {
    actions(registry);

    return (
        <BrowserRouter basename="/modules/moonstone">
            <Jahia routes={registry.find({type: 'route', target: 'nav-root-top'})}
                   topNavGroups={[
                       <PrimaryNavGroup key="topNavGroup" navItems={registry.find({type: 'topNavGroup', target: 'nav-root-top'})}/>
                   ]}
                   bottomNavGroups={[
                       <PrimaryNavGroup key="bottomDocumentationGroup" isDisplayedWhenCollapsed={false} navItems={registry.find({type: 'bottomDocumentationGroup', target: 'nav-root-bottom'})}/>,
                       <PrimaryNavGroup key="bottomProfileGroup" navItems={registry.find({type: 'bottomProfileGroup', target: 'nav-root-bottom'})}/>,
                       <PrimaryNavGroup key="bottomAdminGroup" navItems={registry.find({type: 'bottomAdminGroup', target: 'nav-root-bottom'})}/>
                   ]}
            />
        </BrowserRouter>
    );
};

export default JahiaContainer;
