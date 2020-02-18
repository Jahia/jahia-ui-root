import React, {useContext, useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import JahiaContext from '../Jahia.context';
import {useHistory, useLocation} from 'react-router-dom';

let path = (locale, siteKey, mainResourcePath) => {
    return `/cms/edit/default/${locale}/sites/${siteKey}${mainResourcePath}`;
};

let initialValue = function (location, siteKey) {
    let mainResourcePath = '/home.html';
    if (!location.pathname.endsWith('page-composer') && location.pathname.indexOf(siteKey) >= 0) {
        if (window.frames['page-composer-frame'] === undefined) {
            mainResourcePath = location.pathname.split(siteKey)[1];
        }
    }

    return mainResourcePath;
};

export default function () {
    const jahiaContext = useContext(JahiaContext);
    const composerLocation = useLocation();
    const history = useHistory();
    const [mainResourcePath] = useState(initialValue(composerLocation, jahiaContext.siteKey));

    let getPathFromChildIFrame = function () {
        let framepathname = window.frames[1].location.pathname;

        return framepathname.substr(framepathname.lastIndexOf('/sites/'));
    };

    const iFrameOnHistoryMessage = event => {
        if (event.origin !== window.location.origin) {
            return;
        }

        if (event.data === 'edit frame history updated') {
            let pathFromChildIFrame = getPathFromChildIFrame();
            let newPath = history.location.pathname.replace(/page-composer.*/gi, 'page-composer' + pathFromChildIFrame);
            history.replace(newPath);
        } else if (event.data.msg === 'setTitle') {
            document.title = event.data.title;
        }
    };

    const iFrameOnLoad = () => {
        if (window.frames['page-composer-frame'] !== undefined) {
            window.addEventListener('message', iFrameOnHistoryMessage, false);
        }
    };

    // Temporary solution
    if (jahiaContext.siteKey === 'systemsite') {
        return <h2 style={{color: 'white'}}>You need to create a site to see this page</h2>;
    }

    return (
        <Iframe url={jahiaContext.contextPath + path(jahiaContext.locale, jahiaContext.siteKey, mainResourcePath)}
                width="100%"
                height="100%"
                id="page-composer-frame"
                onLoad={iFrameOnLoad}
        />
    );
}
