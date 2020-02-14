import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItemsGroup} from '@jahia/moonstone';

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, navItems}) => (
    <Suspense fallback="loading...">
        <PrimaryNavItemsGroup
            isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}
        >
            {
                navItems.map(item => {
                    const Cmp = item.render;
                    return <Cmp key={item.key}/>;
                })
            }
        </PrimaryNavItemsGroup>
    </Suspense>
);

PrimaryNavGroup.defaultProps = {
    isDisplayedWhenCollapsed: true,
    navItems: []
};

PrimaryNavGroup.propTypes = {
    isDisplayedWhenCollapsed: PropTypes.bool,
    navItems: PropTypes.arrayOf(PropTypes.any)
};

export default PrimaryNavGroup;
