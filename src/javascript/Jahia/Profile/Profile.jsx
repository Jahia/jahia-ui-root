import React, {useContext} from 'react';
import Iframe from 'react-iframe';
import {useSelector} from 'react-redux';
import JahiaContext from '../Jahia.context';

let path = (locale, user) => {
    return `/cms/dashboardframe/default/${locale}${user}.me.html?redirect=false`;
};

export default function () {
    const jahiaContext = useContext(JahiaContext);
    const redux = useSelector(state => ({language: state.language}));

    return <Iframe url={jahiaContext.contextPath + path(redux.language, jahiaContext.currentUserPath)} width="100%" height="100%"/>;
}
