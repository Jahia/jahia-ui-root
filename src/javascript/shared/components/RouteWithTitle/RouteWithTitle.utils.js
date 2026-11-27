// React-router 6 accepts `*` only after a `/`, a param only at the start of a segment, and the caller appends `/*`
export const toCompatPath = path => {
    if (typeof path !== 'string' || /[()+]|\*.|[^/]:/.test(path) || /:\w+\*$/.test(path)) {
        return null;
    }

    return path.replace(/\/?\*$/, '');
};

// React-router 5 does not match `/x` with `/x/*`, and keeps the rest of the URL in `params[0]` only with `/x/*`
export const toV5Path = path => (typeof path === 'string' && path.endsWith('/*') ? [path, path.slice(0, -2) || '/'] : path);
