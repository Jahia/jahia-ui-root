import React, {Suspense, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PrimaryNavItem, PrimaryNavItemsGroup} from '@jahia/moonstone';
import {registry} from '@jahia/ui-extender';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import {useNodeInfo} from '@jahia/data-helper';
import {useSelector} from 'react-redux';

const usePermissionFilter = (navItems, site, language) => {
    const [requiredPathsAndPermissions, setRequiredPathsAndPermissions] = useState({
        requiredPermission: ['jcr:read_default'],
        requiredPaths: []
    });
    const permissions = useNodeInfo({paths: requiredPathsAndPermissions.requiredPaths, language: language},
        {getPermissions: requiredPathsAndPermissions.requiredPermission});

    useEffect(() => {
        const requiredPermission = requiredPathsAndPermissions.requiredPermission;
        const requiredPaths = requiredPathsAndPermissions.requiredPaths;

        navItems.filter(navItem => navItem.requiredPermission !== undefined).forEach(navItem => {
            if (!requiredPermission.includes(navItem.requiredPermission)) {
                requiredPermission.push(navItem.requiredPermission);
            }

            if (navItem.requiredPermissionPath !== undefined && !requiredPaths.includes(navItem.requiredPermissionPath)) {
                requiredPaths.push(navItem.requiredPermissionPath);
            }
        });

        if (requiredPaths.length === 0) {
            requiredPaths.push('/sites/' + site);
        }

        setRequiredPathsAndPermissions({
            requiredPermission: requiredPermission,
            requiredPaths: requiredPaths
        });
        // eslint-disable-next-line
    }, [navItems.length, site, language]);

    if (permissions.loading === true || permissions.nodes === null) {
        return [];
    }

    return navItems.filter(navItem => navItem.requiredPermission === undefined ||
        permissions.nodes.find(node => {
            if (navItem.requiredPermissionPath !== undefined) {
                return node.path === navItem.requiredPermissionPath;
            }

            return node.path === '/sites/' + site;
        }));
};

export const PrimaryNavGroup = ({isDisplayedWhenCollapsed, target}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const current = useSelector(state => ({language: state.language, site: state.site}));
    const navItems = registry.find({type: 'primary-nav-item', target});
    const filteredNavItems = usePermissionFilter(navItems, current.site, current.language);

    return (
        <Suspense fallback="loading...">
            <PrimaryNavItemsGroup isDisplayedWhenCollapsed={isDisplayedWhenCollapsed}>
                {filteredNavItems.map(item => {
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
