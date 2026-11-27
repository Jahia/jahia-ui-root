import React from 'react';
import PropTypes from 'prop-types';
import renderer, {act} from 'react-test-renderer';
import {MemoryRouter, Switch, useHistory, useParams as useV5Params} from 'react-router-dom';
import {CompatRouter, Route, Routes, useNavigate, useParams} from 'react-router-dom-v5-compat';
import {RouteWithTitle} from './RouteWithTitle';
import {toCompatPath, toV5Path} from './RouteWithTitle.utils';

// Renders a registry route the way Jahia.jsx does under app-shell 4
const renderAt = (url, path, Screen, routeProps = {}) => renderer.create(
    <MemoryRouter initialEntries={[url]}>
        <CompatRouter>
            <Switch>
                <RouteWithTitle routeTitle="Jahia - test" path={toV5Path(path)} {...routeProps} render={props => <Screen {...props}/>}/>
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

// A host written with react-router 5, like jahia-administration and jContent
const v5Host = Child => () => (
    <Switch>
        <RouteWithTitle exact strict routeTitle="Jahia - child" path="/administration/:site/:key" render={props => <Child {...props}/>}/>
    </Switch>
);

// A host written with the react-router 6 API only
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
        ['/item/:id+', null],
        ['/a*/b', null],
        ['/file.:ext', null],
        [['/a', '/b'], null]
    ])('converts %p to %p', (path, expected) => {
        expect(toCompatPath(path)).toBe(expected);
    });
});

describe('toV5Path', () => {
    it.each([
        ['/administration*', '/administration*'],
        ['/dashboard/*', ['/dashboard/*', '/dashboard']],
        ['/*', ['/*', '/']],
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

    it('gives a v5 child the rest of the URL in the unnamed param of a path that ends with /*', () => {
        const params = '{"0":"projects/2"}';
        expect(texts(renderAt('/dashboard/projects/2', '/dashboard/*', V5Child))).toEqual([`v5 ${params} ${params}`]);
    });

    it('renders the bare path of a path that ends with /*', () => {
        expect(texts(renderAt('/dashboard', '/dashboard/*', V6Child))).toEqual(['v6 {"*":""}']);
    });

    it.each([
        ['/dashboard/projects/2', '/dashboard/*', '{"0":"projects/2"}'],
        ['/administration/digitall', '/administration*', '{"0":"/digitall"}']
    ])('renders %p under the exact path %p', (url, path, params) => {
        expect(texts(renderAt(url, path, V5Child, {exact: true}))).toEqual([`v5 ${params} ${params}`]);
    });

    it('renders a URL that only react-router 5 matches with react-router 5', () => {
        const params = '{"0":"foo"}';
        expect(texts(renderAt('/administrationfoo', '/administration*', V5Child))).toEqual([`v5 ${params} ${params}`]);
    });

    it.each([
        ['/item/42', '/item/:id(\\d+)', '{"id":"42"}'],
        ['/file.png', '/file.:ext', '{"ext":"png"}']
    ])('renders %p under %p, which react-router 6 cannot read, with react-router 5 only', (url, path, params) => {
        expect(texts(renderAt(url, path, V5Child))).toEqual([`v5 ${params} ${params}`]);
    });

    it('reads the location that the Switch gives', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={['/test/1']}>
                <CompatRouter>
                    <Switch location={{pathname: '/test/2', search: '', hash: '', state: null}}>
                        <RouteWithTitle routeTitle="Jahia - test" path="/test/:id" render={() => <V6Child/>}/>
                    </Switch>
                </CompatRouter>
            </MemoryRouter>
        );
        expect(texts(tree)).toEqual(['v6 {"id":"2","*":""}']);
    });
});

describe('RouteWithTitle outside a registry route', () => {
    it('renders with react-router 5 only outside a react-router 6 router', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={['/test/1']}>
                <RouteWithTitle routeTitle="Jahia - test" path="/test/:id" render={props => <V5Child {...props}/>}/>
            </MemoryRouter>
        );
        expect(texts(tree)).toEqual(['v5 {"id":"1"} {"id":"1"}']);
    });

    it('calls a children function with no match when the URL does not match', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={['/other']}>
                <CompatRouter>
                    <RouteWithTitle routeTitle="Jahia - test" path="/test/:id">
                        {({match}) => <span>{`match ${JSON.stringify(match)}`}</span>}
                    </RouteWithTitle>
                </CompatRouter>
            </MemoryRouter>
        );
        expect(texts(tree)).toEqual(['match null']);
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
            const rest = registryPath === '/administration*' ? '/acme/users' : 'acme/users';
            expect(texts(tree)).toEqual([`v5 {"0":"${rest}"} undefined`]);
        });

        it('gives a v5 child its match and params through RouteWithTitle', () => {
            const params = '{"site":"digitall","key":"users"}';
            expect(texts(renderAt('/administration/digitall/users', registryPath, v6HostWithV5Props(V5Child)))).toEqual([`v5 ${params} ${params}`]);
        });
    });
});
