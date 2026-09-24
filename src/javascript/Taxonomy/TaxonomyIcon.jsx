import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Svg from './taxonomy.svg';

/**
 * Taxonomy icon, following the same API and sizing classes as the icons
 * shipped by @jahia/moonstone so it can be used wherever they are.
 */
export const TaxonomyIcon = ({size, className, ...props}) => (
    <Svg className={clsx('moonstone-icon', `moonstone-icon_${size}`, className)}
         aria-hidden="true"
         focusable="false"
         {...props}/>
);

TaxonomyIcon.defaultProps = {
    size: 'default'
};

TaxonomyIcon.propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'big']),
    className: PropTypes.string
};

export default TaxonomyIcon;
