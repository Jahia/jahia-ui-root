import React from 'react';
import {DocumentationGroup} from './DocumentationGroup';
import {TaxonomyNavItem} from './Taxonomy';

export const jahiaNav = registry => {
    // Sits between jContent (nav-root-top:2) and jExperience
    registry.add('primary-nav-item', 'taxonomy', {
        targets: ['nav-root-top:2.5'],
        render: () => <TaxonomyNavItem/>
    });

    registry.add('primary-nav-item', 'bottomDocNavGroup', {
        targets: ['nav-root-documentation:1'],
        render: () => <DocumentationGroup/>
    });
};
