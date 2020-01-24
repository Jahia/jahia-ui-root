import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import actions from './Jahia.actions';
import {registry} from '@jahia/ui-extender';
import Jahia from './Jahia';
import PrimaryNavGroup from './PrimaryNavGroup';
import JahiaContext from './Jahia.context';
import './Jahia.routes';

const JahiaContainer = ({jahiaCtx}) => {
    actions(registry);

    return (
        <BrowserRouter basename={jahiaCtx.contextPath + '/modules/moonstone'}>
            <JahiaContext.Provider value={jahiaCtx}>
                <Jahia routes={registry.find({type: 'route', target: 'nav-root-top'})}
                       topNavGroups={[
                           <PrimaryNavGroup key="topNavGroup"
                                            navItems={registry.find({
                                                    type: 'topNavGroup',
                                                    target: 'nav-root-top'
                                                })}/>
                           ]}
                       bottomNavGroups={[
                           <PrimaryNavGroup key="bottomDocumentationGroup"
                                            isDisplayedWhenCollapsed={false}
                                            navItems={registry.find({
                                                    type: 'bottomDocumentationGroup',
                                                    target: 'nav-root-bottom'
                                                })}/>,
                           <PrimaryNavGroup key="bottomProfileGroup"
                                            navItems={registry.find({
                                   type: 'bottomProfileGroup',
                                   target: 'nav-root-bottom'
                               })}/>,
                           <PrimaryNavGroup key="bottomAdminGroup"
                                            navItems={registry.find({
                                   type: 'bottomAdminGroup',
                                   target: 'nav-root-bottom'
                               })}/>
                           ]}
                    />
            </JahiaContext.Provider>
        </BrowserRouter>
    );
};

JahiaContainer.propTypes = {
    jahiaCtx: PropTypes.object
};

export default JahiaContainer;
