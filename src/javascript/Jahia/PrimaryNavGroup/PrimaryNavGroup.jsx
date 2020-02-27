import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItemsGroup} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, target}) => (
    <Suspense fallback="loading...">
        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>
            {registry.find({type: 'primary-nav-item', target}).map(item => React.cloneElement(item.render(), {key: item.key}))}
        </PrimaryNavItemsGroup>
    </Suspense>
);

PrimaryNavGroup.defaultProps = {
    isDisplayedWhenCollapsed: true
};

PrimaryNavGroup.propTypes = {
    isDisplayedWhenCollapsed: PropTypes.bool,
    target: PropTypes.string.isRequired
};

export default PrimaryNavGroup;
