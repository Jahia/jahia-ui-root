import React from 'react';
import {LicenseInvalid} from './LicenseInvalid';
import Taxonomy, {TAXONOMY_ROUTE} from './Taxonomy';

const valid = contextJsParameters.valid;

export const jahiaRoutes = registry => {
    registry.add('route', 'requireCoreLicenseRoot', {
        render: () => !valid && <LicenseInvalid/>
    });

    registry.add('route', 'route-taxonomy', {
        targets: ['main:2.5'],
        path: TAXONOMY_ROUTE,
        render: () => registry.get('route', 'requireCoreLicenseRoot').render() || <Taxonomy/>
    });
};
