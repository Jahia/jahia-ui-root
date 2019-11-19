import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItemsGroup} from '@jahia/moonstone';

const PrimaryNavGroup = ({isDisplayedWhenCollapsed, navItems}) => (
    <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>{navItems.map(item => item.render())}</PrimaryNavItemsGroup>
);

PrimaryNavGroup.defaultProps = {
    isDisplayedWhenCollapsed: true,
    navItems: []
};

PrimaryNavGroup.propTypes = {
    isDisplayedWhenCollapsed: PropTypes.bool,
    navItems: PropTypes.arrayOf(PropTypes.element)
};

export default PrimaryNavGroup;
