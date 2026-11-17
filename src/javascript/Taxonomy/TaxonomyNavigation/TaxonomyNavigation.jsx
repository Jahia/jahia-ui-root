import React from 'react';
import PropTypes from 'prop-types';
import {SecondaryNav, SecondaryNavHeader, TreeView, Typography} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';

/**
 * Level 2 navigation of the Taxonomy app: a flat list of entries, one per registered section.
 * Entries are plain items, not accordions - each one opens its own app in the main panel.
 */
export const TaxonomyNavigation = ({items, openedItem, navHeader, onSelectItem}) => {
    const {t} = useTranslation('jahia-ui-root');

    const header = (
        <>
            <SecondaryNavHeader>
                <Typography variant="heading" weight="default">{t('jahia-ui-root:taxonomy.label')}</Typography>
            </SecondaryNavHeader>
            {navHeader}
        </>
    );

    const data = items.map(item => ({
        id: item.key,
        label: t(item.label),
        iconStart: item.icon,
        treeItemProps: {'data-registry-key': `${item.type}:${item.key}`}
    }));

    return (
        <SecondaryNav header={header}>
            {items.length === 0 ? (
                <Typography variant="body">{t('jahia-ui-root:taxonomy.empty')}</Typography>
            ) : (
                <TreeView data={data}
                          selectedItems={openedItem ? [openedItem] : []}
                          onClickItem={node => onSelectItem(node.id)}/>
            )}
        </SecondaryNav>
    );
};

TaxonomyNavigation.propTypes = {
    items: PropTypes.array.isRequired,
    openedItem: PropTypes.string,
    navHeader: PropTypes.node,
    onSelectItem: PropTypes.func.isRequired
};

export default TaxonomyNavigation;
