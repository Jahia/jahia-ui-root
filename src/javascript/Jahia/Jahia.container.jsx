import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import actions from './Jahia.actions';
import {registry} from '@jahia/registry';
import {Jahia} from './Jahia';
import PrimaryNavGroup from './PrimaryNavGroup';
import {I18nextProvider} from 'react-i18next';
import {getI18n} from '@jahia/i18next';
import JahiaContext from './Jahia.context';
import './Jahia.routes';

const DEFAULT_NS = 'jahia-ui-root';
const NAMESPACE_RESOLVERS = {
    [DEFAULT_NS]: lang => require('../../main/resources/javascript/locales/' + lang + '.json')
};

const JahiaContainer = ({jahiaCtx}) => {
    actions(registry);

    return (
        <I18nextProvider i18n={getI18n({
            lng: jahiaCtx.locale,
            contextPath: jahiaCtx.contextPath,
            ns: jahiaCtx.i18nNamespaces,
            defaultNS: DEFAULT_NS,
            namespaceResolvers: NAMESPACE_RESOLVERS
        })}
        >
            <BrowserRouter basename="/cms/moonstone">
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
        </I18nextProvider>
    );
};

JahiaContainer.propTypes = {
    jahiaCtx: PropTypes.object
};

export default JahiaContainer;
