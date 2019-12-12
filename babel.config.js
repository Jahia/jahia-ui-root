module.exports = {
    sourceMaps: 'inline',
    presets: [
        '@babel/preset-react',
        ['@babel/preset-env', {targets: {node: 'current'}}]
    ],
    plugins: [
        '@babel/plugin-transform-classes',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-transform-runtime', {regenerator: true}]
    ]
};
