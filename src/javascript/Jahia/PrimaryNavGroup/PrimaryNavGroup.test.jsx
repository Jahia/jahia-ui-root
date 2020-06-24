import React from 'react';
import {render} from '@testing-library/react';
import PrimaryNavGroup from './PrimaryNavGroup';

jest.mock('react-router', () => {
    return {
        useHistory: jest.fn(() => {
        })
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
        useNodeInfo: jest.fn(() => ([{
            data: {
                jcr: {
                    nodesByPath: [{
                        name: 'systemsite',
                        uuid: 'fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff',
                        workspace: 'EDIT',
                        path: '/sites/systemsite',
                        __typename: 'JCRSite',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }], __typename: 'JCRQuery'
                }
            }
        }, {
            data: {
                jcr: {
                    nodesByPath: [{
                        name: 'systemsite',
                        uuid: 'fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff',
                        workspace: 'EDIT',
                        path: '/sites/systemsite',
                        __typename: 'JCRSite',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }, {
                        name: '',
                        uuid: 'cafebabe-cafe-babe-cafe-babecafebabe',
                        workspace: 'EDIT',
                        path: '/',
                        __typename: 'GenericJCRNode',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }], __typename: 'JCRQuery'
                }
            }
        }, {
            data: {
                jcr: {
                    nodesByPath: [{
                        name: 'systemsite',
                        uuid: 'fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff',
                        workspace: 'EDIT',
                        path: '/sites/systemsite',
                        __typename: 'JCRSite',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }], __typename: 'JCRQuery'
                }
            }
        }, {
            data: {
                jcr: {
                    nodesByPath: [{
                        name: 'systemsite',
                        uuid: 'fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff',
                        workspace: 'EDIT',
                        path: '/sites/systemsite',
                        __typename: 'JCRSite',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }], __typename: 'JCRQuery'
                }
            }
        }, {
            data: {
                jcr: {
                    nodesByPath: [{
                        name: 'systemsite',
                        uuid: 'fd148dc0-1a97-4eb0-8ec6-fbeee9ddbdff',
                        workspace: 'EDIT',
                        path: '/sites/systemsite',
                        __typename: 'JCRSite',
                        // eslint-disable-next-line camelcase
                        permission_encoded_amNyOnJlYWRfZGVmYXVsdA: true
                    }], __typename: 'JCRQuery'
                }
            }
        }]))
    };
});

describe('primary nav group', () => {
    test('collapsed and empty nav bar', () => {
        const {asFragment} = render(
            <PrimaryNavGroup isDisplayedWhenCollapsed target="none"/>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
