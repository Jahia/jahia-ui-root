import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {useLocation, useNavigate} from 'react-router-dom-v5-compat';
import {jahiaApps} from './JahiaUiRoot.app.register';

jest.mock('./Jahia', () => () => null);
jest.mock('./Jahia/PrimaryNavGroup', () => () => null);
jest.mock('connected-react-router', () => {
    const {createElement} = jest.requireActual('react');
    const {Router} = jest.requireActual('react-router');
    return {
        ConnectedRouter: ({history, children}) => createElement(Router, {history}, children),
        connectRouter: () => state => state,
        routerMiddleware: () => () => next => next
    };
});

const Extension = () => {
    const navigate = useNavigate();
    return <button type="button" onClick={() => navigate('/jcontent/digitall')}>{useLocation().pathname}</button>;
};

describe('the router app', () => {
    it('lets a UI extension navigate with the react-router 6 hooks', () => {
        const apps = {};
        window.history.pushState({}, '', '/jahia/dashboard');
        jahiaApps({
            add: (type, key, value) => {
                if (type === 'app') {
                    apps[key] = value;
                }
            }
        }, {urlbase: '/jahia'});

        const tree = renderer.create(apps.router.render(<Extension/>));
        act(() => tree.root.findByType('button').props.onClick());

        expect(tree.root.findByType('button').children).toEqual(['/jcontent/digitall']);
    });
});
