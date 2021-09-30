import React from 'react';
import {DocumentationGroup} from './DocumentationGroup';

export const jahiaNav = registry => {
    registry.add('primary-nav-item', 'bottomDocNavGroup', {
        targets: ['nav-root-documentation:1'],
        render: () => <DocumentationGroup/>
    });
};
