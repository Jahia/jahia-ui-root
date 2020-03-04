import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, target}) => {
    const {t} = useTranslation();
    const history = useHistory();

    return (
        <Suspense fallback="loading...">
            <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>
                {registry.find({type: 'primary-nav-item', target}).map(item => {
                    if (item.render) {
                        return React.cloneElement(item.render(), {key: item.key});
                    }

                    return (
                        <PrimaryNavItem key={item.key}
                                        role={`${item.key}-menu-item`}
                                        isSelected={history.location.pathname.startsWith(item.path)}
                                        icon={item.icon}
                                        label={t(item.label)}
                                        onClick={() => history.push(item.path)}/>
                    );
                })}
            </PrimaryNavItemsGroup>
        </Suspense>
    );
};

PrimaryNavGroup.defaultProps = {
    isDisplayedWhenCollapsed: true
};

PrimaryNavGroup.propTypes = {
    isDisplayedWhenCollapsed: PropTypes.bool,
    target: PropTypes.string.isRequired
};

export default PrimaryNavGroup;
