import React from 'react';
import renderer from 'react-test-renderer';
import {DocumentationGroup} from '../Jahia/jahia.routes.jsx';

describe('documentation group', () => {

    test('links', () => {
        window.contextJsParameters = { links: {whatsNew: "mock_url", documentation: "mock_url"}};
        const component = renderer.create(
            <DocumentationGroup />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
