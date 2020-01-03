import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryNavGroup from '../Jahia/PrimaryNavGroup';

describe('primary nav group', () => {

    test('collapsed and empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup navItems={[]} isDisplayedWhenCollapsed={true}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('expanded and empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup navItems={[]} isDisplayedWhenCollapsed={false}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('expanded and not empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup navItems={[{render: () => <span>mock_content</span>}]} isDisplayedWhenCollapsed={false}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('collapsed and not empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup navItems={[{render: () => <span>mock_content</span>}]} isDisplayedWhenCollapsed={true}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
