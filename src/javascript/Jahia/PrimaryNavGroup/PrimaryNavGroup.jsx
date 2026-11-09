import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router';
import {shallowEqual, useSelector} from 'react-redux';
import {usePermissionFilter} from '../../shared/hooks';

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, target}) => {
    const {t} = useTranslation('jahia-ui-root');
    const history = useHistory();
    const current = useSelector(state => ({language: state.language, site: state.site}), shallowEqual);
    const location = useLocation();
    const navItems = registry.find({type: 'primary-nav-item', target});
    const filteredNavItems = usePermissionFilter(navItems, current.site, current.language);

    return (
        <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>
            {filteredNavItems.map(item => {
                const foundTarget = item.targets.find(t => t.id === target);
                const props = {
                    key: item.key,
                    role: item.key + '-menu-item',
                    'data-registry-key': item.type + ':' + item.key,
                    'data-registry-target': foundTarget.id + ':' + foundTarget.priority
                };

                if (item.render) {
                    return React.cloneElement(item.render(), props);
                }

                return (
                    <PrimaryNavItem key={item.key}
                                    {...props}
                                    isSelected={location.pathname.startsWith(item.path)}
                                    icon={item.icon}
                                    label={t(item.label)}
                                    onClick={() => history.push(item.path)}/>
                );
            })}
        </PrimaryNavItemsGroup>
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
