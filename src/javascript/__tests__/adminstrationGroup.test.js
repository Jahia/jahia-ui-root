import React from 'react';
import renderer from 'react-test-renderer';
import {AdministrationGroup} from '../Jahia/jahia.routes.jsx';

describe('adminstration group', () => {

    test('admin icons', () => {
        const component = renderer.create(
            <AdministrationGroup />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
