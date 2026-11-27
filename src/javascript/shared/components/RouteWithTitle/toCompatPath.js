// React-router 6 accepts `*` only after a `/`, and the caller appends `/*` to a non-exact path
export const toCompatPath = path => {
    if (typeof path !== 'string' || /[()+]|\*./.test(path) || /:\w+\*$/.test(path)) {
        return null;
    }

    return path.replace(/\/?\*$/, '');
};

// React-router 5 does not match `/x` with `/x/*`
export const toV5Path = path => (typeof path === 'string' && path.endsWith('/*') ? path.slice(0, -2) || '/' : path);
