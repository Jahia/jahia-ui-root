import React, {useContext} from 'react';
import Iframe from 'react-iframe';
import JahiaContext from '../Jahia.context';

let path = (locale, siteKey) => {
    return `/cms/edit/default/${locale}/sites/${siteKey}/home.html`;
};

export default function () {
    const jahiaContext = useContext(JahiaContext);

    // Temporary solution
    if (jahiaContext.siteKey === 'systemsite') {
        return <h2 style={{color: 'white'}}>You need to create a site to see this page</h2>;
    }

    return <Iframe url={jahiaContext.contextPath + path(jahiaContext.locale, jahiaContext.siteKey)} width="100%" height="100%"/>;
}
