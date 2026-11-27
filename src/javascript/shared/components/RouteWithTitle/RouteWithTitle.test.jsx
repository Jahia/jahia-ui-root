import React from 'react';
import PropTypes from 'prop-types';
import renderer, {act} from 'react-test-renderer';
import {MemoryRouter, Switch, useHistory, useParams as useV5Params} from 'react-router-dom';
import {CompatRouter, Route, Routes, useNavigate, useParams} from 'react-router-dom-v5-compat';
import {RouteWithTitle} from './RouteWithTitle';
import {toCompatPath, toV5Path} from './toCompatPath';

// Renders a registry route the way Jahia.jsx does under app-shell 4
const renderAt = (url, path, Screen) => renderer.create(
    <MemoryRouter initialEntries={[url]}>
        <CompatRouter>
            <Switch>
                <RouteWithTitle routeTitle="Jahia - test" path={toV5Path(path)} render={props => <Screen {...props}/>}/>
            </Switch>
        </CompatRouter>
    </MemoryRouter>
);

const texts = tree => tree.root.findAllByType('span').map(span => span.children.join(''));
const click = tree => act(() => tree.root.findByType('button').props.onClick());

const V6Child = () => {
    const navigate = useNavigate();
    return (
        <>
            <span>{`v6 ${JSON.stringify(useParams())}`}</span>
            <button type="button" onClick={() => navigate('/administration/acme/users')}>go</button>
        </>
    );
};

const V5Child = ({match}) => {
    const history = useHistory();
    return (
        <>
            <span>{`v5 ${JSON.stringify(useV5Params())} ${JSON.stringify(match?.params)}`}</span>
            <button type="button" onClick={() => history.push('/administration/acme/users')}>go</button>
        </>
    );
};

V5Child.propTypes = {match: PropTypes.shape({params: PropTypes.object})};

// A host written with react-router 5, like jahia-administration and jContent today
const v5Host = Child => () => (
    <Switch>
        <RouteWithTitle exact strict routeTitle="Jahia - child" path="/administration/:site/:key" render={props => <Child {...props}/>}/>
    </Switch>
);

// A host written with the react-router 6 API only, compatible with app-shell 4 and 5
const v6Host = Child => () => (
    <Routes>
        <Route index element={<span>empty</span>}/>
        <Route path="aboutJahia" element={<span>about</span>}/>
        <Route path=":site/:key" element={<Child/>}/>
    </Routes>
);

// A host written with the react-router 6 API that hands react-router 5 props to its children
const v6HostWithV5Props = Child => () => (
    <Routes>
        <Route
            path=":site/:key"
            element={<RouteWithTitle routeTitle="Jahia - child" path="/administration/:site/:key" render={props => <Child {...props}/>}/>}
        />
    </Routes>
);

describe('toCompatPath', () => {
    it.each([
        ['/jcontent/:siteKey/:lang/:mode', '/jcontent/:siteKey/:lang/:mode'],
        ['/administration*', '/administration'],
        ['/dashboard/*', '/dashboard'],
        ['/sites/:site/:path*', null],
        ['/item/:id(\\d+)', null],
        [['/a', '/b'], null]
    ])('converts %p to %p', (path, expected) => {
        expect(toCompatPath(path)).toBe(expected);
    });
});

describe('toV5Path', () => {
    it.each([
        ['/administration*', '/administration*'],
        ['/dashboard/*', '/dashboard'],
        ['/*', '/'],
        [['/a', '/b'], ['/a', '/b']]
    ])('converts %p to %p', (path, expected) => {
        expect(toV5Path(path)).toEqual(expected);
    });
});

describe('RouteWithTitle as a registry route', () => {
    it('sets the title of the page', () => {
        renderAt('/test/1', '/test/:id', V6Child);
        expect(window.top.document.title).toBe('Jahia - test');
    });

    it('gives the v6 hooks the params of the route', () => {
        expect(texts(renderAt('/test/1', '/test/:id', V6Child))).toEqual(['v6 {"id":"1","*":""}']);
    });

    it('gives the v5 hooks the params of the route', () => {
        expect(texts(renderAt('/test/1', '/test/:id', V5Child))).toEqual(['v5 {"id":"1"} {"id":"1"}']);
    });

    it('keeps the unnamed param of a path that ends with a star after a letter', () => {
        const params = '{"0":"/digitall/users"}';
        expect(texts(renderAt('/administration/digitall/users', '/administration*', V5Child))).toEqual([`v5 ${params} ${params}`]);
    });

    it('gives the rest of the URL in the star param of a path that ends with /*', () => {
        expect(texts(renderAt('/dashboard/projects/2', '/dashboard/*', V6Child))).toEqual(['v6 {"*":"projects/2"}']);
    });

    it('renders a path that react-router 6 cannot read with react-router 5 only', () => {
        expect(texts(renderAt('/item/42', '/item/:id(\\d+)', V5Child))).toEqual(['v5 {"id":"42"} {"id":"42"}']);
    });
});

describe.each(['/administration*', '/administration/*'])('under the registry route %p', registryPath => {
    describe('a host written with react-router 5', () => {
        it('gives a v6 child the params of its route', () => {
            expect(texts(renderAt('/administration/digitall/users', registryPath, v5Host(V6Child)))).toEqual(['v6 {"site":"digitall","key":"users"}']);
        });

        it('lets a v6 child navigate', () => {
            const tree = renderAt('/administration/digitall/users', registryPath, v5Host(V6Child));
            click(tree);
            expect(texts(tree)).toEqual(['v6 {"site":"acme","key":"users"}']);
        });

        it('gives a v5 child its match and params', () => {
            const params = '{"site":"digitall","key":"users"}';
            expect(texts(renderAt('/administration/digitall/users', registryPath, v5Host(V5Child)))).toEqual([`v5 ${params} ${params}`]);
        });
    });

    describe('a host written with the react-router 6 API only', () => {
        it.each([
            ['/administration', 'empty'],
            ['/administration/aboutJahia', 'about'],
            ['/administration/digitall/users', 'v6 {"*":"digitall/users","site":"digitall","key":"users"}']
        ])('renders %p', (url, expected) => {
            expect(texts(renderAt(url, registryPath, v6Host(V6Child)))).toEqual([expected]);
        });

        it('lets a v6 child navigate', () => {
            const tree = renderAt('/administration/digitall/users', registryPath, v6Host(V6Child));
            click(tree);
            expect(texts(tree)).toEqual(['v6 {"*":"acme/users","site":"acme","key":"users"}']);
        });

        it('lets a v5 child navigate', () => {
            const tree = renderAt('/administration/digitall/users', registryPath, v6Host(V5Child));
            click(tree);
            expect(tree.root.findAllByType('span')).toHaveLength(1);
        });

        it('gives a v5 child its match and params through RouteWithTitle', () => {
            const params = '{"site":"digitall","key":"users"}';
            expect(texts(renderAt('/administration/digitall/users', registryPath, v6HostWithV5Props(V5Child)))).toEqual([`v5 ${params} ${params}`]);
        });
    });
});
