import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    holder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    color: 'white'
};

const JahiaError = ({operatingMode}) => (
    <div style={styles.holder}>
        <h1 style={{color: styles.color}}>Error while rendering application!</h1>
        {operatingMode === 'development' && <p style={{color: styles.color}}>One of the promises was rejected. Open dev console to see error details.</p>}
    </div>
);

JahiaError.propTypes = {
    operatingMode: PropTypes.string.isRequired
};

export default JahiaError;

