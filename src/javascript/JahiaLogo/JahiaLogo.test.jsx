import React from 'react';
import renderer from 'react-test-renderer';
import JahiaLogo from './JahiaLogo';

jest.mock('./jahiaLogo.svg', () => {
    return () => <svg/>;
});

describe('Jahia Logo', () => {
    test('logo', () => {
        const component = renderer.create(
            <JahiaLogo/>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
