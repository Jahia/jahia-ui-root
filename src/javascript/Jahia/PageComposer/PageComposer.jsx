import React, {useContext} from 'react';
import Iframe from 'react-iframe';
import {useSelector} from 'react-redux';
import JahiaContext from '../Jahia.context';

let path = (locale, siteKey) => {
    return `/cms/edit/default/${locale}/sites/${siteKey}/home.html?redirect=false`;
};

export default function () {
    const jahiaContext = useContext(JahiaContext);
    const current = useSelector(state => ({language: state.language, site: state.site}));

    // Temporary solution
    if (current.site === 'systemsite') {
        return <h2 style={{color: 'white'}}>You need to create a site to see this page</h2>;
    }

    return <Iframe url={jahiaContext.contextPath + path(current.language, current.site)} width="100%" height="100%"/>;
}
