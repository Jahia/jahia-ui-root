import React from 'react';
import renderer from 'react-test-renderer';
import JahiaLogo from '../Jahia/JahiaLogo';

describe('Jahia Logo', () => {

    test('logo', () => {
        const component = renderer.create(
            <JahiaLogo />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
