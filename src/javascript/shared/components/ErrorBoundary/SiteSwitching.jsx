import React from 'react';
import {ErrorLayout} from './ErrorLayout';
import {shallowEqual, useSelector} from 'react-redux';

export const SiteSwitching = props => {
    const current = useSelector(state => ({language: state.language, site: state.site}), shallowEqual);
    return (
        <ErrorLayout title="Site switching"
                     subtitles={[`Switching to site ${current.site}`]}
                     {...props}
        />
    );
};

SiteSwitching.propTypes = {
};

