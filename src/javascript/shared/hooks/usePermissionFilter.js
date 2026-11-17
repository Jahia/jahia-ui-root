import {useMemo} from 'react';
import {useNodeInfo} from '@jahia/data-helper';

const asArray = value => (value === undefined ? [] : [].concat(value));

/**
 * Filters registry items on their optional gating attributes:
 *
 * - requiredPermission / requiredPermissionPath: the permission is checked on the given path,
 *   or on the current site when no path is given.
 * - requireModuleInstalledOnSite: the module(s) must be installed on the current site. Entries
 *   backed by another module (an iframed app, for instance) are unusable otherwise.
 *
 * Items declaring none of these are always kept. While the query resolves an empty list is
 * returned, so callers never flash entries the user cannot access.
 */
export const usePermissionFilter = (items, site, language) => {
    const sitePath = `/sites/${site}`;

    const {requiredPermission, requiredPaths, needsInstalledModules} = useMemo(() => {
        const reqPermission = ['jcr:read_default'];
        const reqPaths = [];
        const reqModules = items.some(item => item.requireModuleInstalledOnSite !== undefined);

        items.filter(item => item.requiredPermission !== undefined).forEach(item => {
            if (!reqPermission.includes(item.requiredPermission)) {
                reqPermission.push(item.requiredPermission);
            }

            const path = item.requiredPermissionPath === undefined ? sitePath : item.requiredPermissionPath;
            if (!reqPaths.includes(path)) {
                reqPaths.push(path);
            }
        });

        // The installed modules are read off the current site node, so make sure it is queried
        if ((reqModules || reqPaths.length === 0) && !reqPaths.includes(sitePath)) {
            reqPaths.push(sitePath);
        }

        return {requiredPermission: reqPermission, requiredPaths: reqPaths, needsInstalledModules: reqModules};
    }, [items, sitePath]);

    const {loading, nodes, error} = useNodeInfo(
        {paths: requiredPaths, language: language},
        {getPermissions: requiredPermission, getSiteInstalledModules: needsInstalledModules || undefined});

    if (error) {
        console.error('An error occur while getting permissions ' + requiredPermission + ' for nodes ' + requiredPaths, error);
        return [];
    }

    if (loading || !nodes) {
        // Wait for the query to be done.
        return [];
    }

    const siteNode = nodes.find(node => node.path === sitePath);
    const installedModules = siteNode?.site?.installedModulesWithAllDependencies || [];

    return items.filter(item => {
        if (item.requireModuleInstalledOnSite !== undefined &&
            !asArray(item.requireModuleInstalledOnSite).every(module => installedModules.includes(module))) {
            return false;
        }

        if (!item.requiredPermission) {
            return true;
        }

        const permissionNode = nodes.find(node => node.path ===
            (item.requiredPermissionPath === undefined ? sitePath : item.requiredPermissionPath));

        return permissionNode && permissionNode[item.requiredPermission];
    });
};
