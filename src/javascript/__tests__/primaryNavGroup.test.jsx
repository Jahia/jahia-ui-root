import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryNavGroup from '../Jahia/PrimaryNavGroup';
import {registry} from '@jahia/ui-extender';

describe('primary nav group', () => {

    test('collapsed and empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup target={'none'} isDisplayedWhenCollapsed={true}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('expanded and empty nav bar', () => {

        const component = renderer.create(
            <PrimaryNavGroup target={'none'} isDisplayedWhenCollapsed={false}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('expanded and not empty nav bar', () => {
        registry.add('primary-nav-item', 'test1', {
            targets:['target1'],
            render: () => <span>mock_content</span>
        });

        const component = renderer.create(
            <PrimaryNavGroup target="target1" isDisplayedWhenCollapsed={false}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('collapsed and not empty nav bar', () => {
        registry.add('primary-nav-item', 'test2', {
            targets:['target2'],
            render: () => <span>mock_content</span>
        });

        const component = renderer.create(
            <PrimaryNavGroup target="target2" isDisplayedWhenCollapsed={true}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
