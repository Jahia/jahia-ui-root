import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {LoaderOverlay} from './LoaderOverlay';

export const LoaderSuspense = ({children, fallback}) => (
    <Suspense fallback={fallback}>
        {children}
    </Suspense>
);

LoaderSuspense.defaultProps = {
    fallback: <LoaderOverlay/>
};

LoaderSuspense.propTypes = {
    fallback: PropTypes.element,
    children: PropTypes.element
};
