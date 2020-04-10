import React from 'react';
import PropTypes from 'prop-types';
import Svg from './jahiaLogo.svg';

const JahiaLogo = ({width, height}) => (
    <Svg style={{width: width, height: height}} viewBox="0 0 176 80"/>
);

JahiaLogo.defaultProps = {
    width: '6rem',
    height: '2rem'
};

JahiaLogo.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default JahiaLogo;
