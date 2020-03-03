import React from 'react';
import renderer from 'react-test-renderer';
import JahiaContainer from '../Jahia';

describe('Jahia container', () => {

    test('full app', () => {
        const jahiaCtx = { locale: "en", uilang: "en", siteKey: "systemsite" };
        window.contextJsParameters = { user: {fullname: "mock_fullname", email: "mock_email"}, links: { whatsNew: "mock_url", documentation: "mock_url"}};
        const component = renderer.create(
            <JahiaContainer jahiaCtx={jahiaCtx}/>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
