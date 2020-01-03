import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileGroup} from '../Jahia/Jahia.routes';

describe('profile group', () => {

    test('profiles', () => {
        window.contextJsParameters = { user: {fullname: "mock_fullname", email: "mock_email"}};
        const component = renderer.create(
            <ProfileGroup />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
