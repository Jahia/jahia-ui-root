import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {parseUrl} from './IframeRenderer.utils';
import {IframeRenderer} from './IframeRenderer';
import {Loader} from '@jahia/moonstone';

export const IframeRendererContainer = ({url, onLoad, ...props}) => {
    const {siteKey, uiLang, language} = useSelector(state => ({
        siteKey: state.site,
        uiLang: state.uilang,
        language: state.language
    }), shallowEqual);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.waitingMask = message => {
            setLoading(message);
        };

        return () => {
            delete window.waitingMask;
        };
    });

    return (
        <div className="flexCol_center alignCenter flexFluid" style={{position: 'relative'}}>
            {loading && (
                <div className="flexCol_center alignCenter" style={{width: '100%', height: '100%', position: 'absolute'}}>
                    <div style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', opacity: 0.8}}/>
                    <Loader size="big"/>
                </div>
            )}
            <IframeRenderer width="100%"
                            height="100%"
                            {...props}
                            url={parseUrl(url, siteKey, language, uiLang)}
                            onLoad={e => {
                                if (loading) {
                                    setLoading(false);
                                }

                                if (onLoad) {
                                    onLoad(e);
                                }
                            }}/>
        </div>
    );
};

export const getIframeRendererContainer = url => {
    return <IframeRendererContainer url={url}/>;
};

IframeRendererContainer.propTypes = {
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func
};
