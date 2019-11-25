import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItemsGroup} from '@jahia/moonstone';

const PrimaryNavGroup = ({isDisplayedWhenCollapsed, navItems}) => (
    <Suspense fallback="loading...">
        <PrimaryNavItemsGroup
            isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}
        >{navItems.map(item => item.render())}
        </PrimaryNavItemsGroup>
    </Suspense>
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
