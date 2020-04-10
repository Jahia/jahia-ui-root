import React from 'react';
import {LicenseInvalid} from './LicenseInvalid';

const valid = contextJsParameters.valid;

export const jahiaRoutes = registry => {
    registry.add('route', 'requireCoreLicenseRoot', {
        render: () => !valid && <LicenseInvalid/>
    });
};
