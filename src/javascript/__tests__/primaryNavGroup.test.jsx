import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryNavGroup from '../Jahia/PrimaryNavGroup';
import {registry} from '@jahia/ui-extender';

jest.mock('react-router', () => {
    return {
        useHistory: jest.fn(() => {})
    };
});

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn(() => ({
            site: 'systemsite',
            language: 'en'
        }))
    };
});

jest.mock('@jahia/data-helper', () => {
    return {
        useNodeInfo: jest.fn(() => ([{"data":{"jcr":{"nodesByPath":[{"name":"systemsite","uuid":"fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff","workspace":"EDIT","path":"/sites/systemsite","__typename":"JCRSite","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true}],"__typename":"JCRQuery"}}},{"data":{"jcr":{"nodesByPath":[{"name":"systemsite","uuid":"fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff","workspace":"EDIT","path":"/sites/systemsite","__typename":"JCRSite","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true},{"name":"","uuid":"cafebabe-cafe-babe-cafe-babecafebabe","workspace":"EDIT","path":"/","__typename":"GenericJCRNode","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true}],"__typename":"JCRQuery"}}},{"data":{"jcr":{"nodesByPath":[{"name":"systemsite","uuid":"fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff","workspace":"EDIT","path":"/sites/systemsite","__typename":"JCRSite","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true}],"__typename":"JCRQuery"}}},{"data":{"jcr":{"nodesByPath":[{"name":"systemsite","uuid":"fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff","workspace":"EDIT","path":"/sites/systemsite","__typename":"JCRSite","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true}],"__typename":"JCRQuery"}}},{"data":{"jcr":{"nodesByPath":[{"name":"systemsite","uuid":"fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff","workspace":"EDIT","path":"/sites/systemsite","__typename":"JCRSite","permission_encoded_amNyOnJlYWRfZGVmYXVsdA":true}],"__typename":"JCRQuery"}}}]))
    };
});

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
