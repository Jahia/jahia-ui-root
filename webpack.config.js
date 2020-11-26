const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
    let config = {
        entry: {
            jahiaUiRoot: [path.resolve(__dirname, 'src/javascript/index')]
        },
        output: {
            path: path.resolve(__dirname, 'src/main/resources/javascript/apps/'),
            filename: 'jahiaUiRoot.bundle.js',
            chunkFilename: '[name].jahiaUiRoot.[chunkhash:6].js'
        },
        resolve: {
            mainFields: ['module', 'main'],
            extensions: ['.mjs', '.js', '.jsx', 'json']
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    type: 'javascript/auto'
                },
                {
                    test: /\.jsx?$/,
                    include: [path.join(__dirname, 'src')],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    modules: false,
                                    targets: {chrome: '60', edge: '44', firefox: '54', safari: '12'}
                                }],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader:'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                native: false,
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "jahiaUi",
                library: { type: "assign", name: "appShell.remotes.jahiaUi" },
                filename: "remoteEntry.js",
                exposes: {
                    './init': './src/javascript/JahiaUiRoot.register'
                },
                remotes: {
                    '@jahia/app-shell': 'appShellRemote'
                },
                shared: [
                    'react',
                    'react-dom',
                    'react-router',
                    'react-router-dom',
                    'react-i18next',
                    'i18next',
                    'i18next-xhr-backend',
                    'graphql-tag',
                    'react-apollo',
                    'react-redux',
                    'redux',
                    'rxjs',
                    'whatwg-fetch',
                    'dayjs',

                    // JAHIA PACKAGES
                    '@jahia/ui-extender',
                    '@jahia/moonstone',
                    '@jahia/moonstone-alpha',
                    '@jahia/data-helper',

                    // DEPRECATED JAHIA PACKAGES
                    '@jahia/design-system-kit',
                    '@jahia/react-material',
                    '@jahia/icons'
                ]
            }),
            new CleanWebpackPlugin({
              cleanOnceBeforeBuildPatterns: [`${path.resolve(__dirname, 'src/main/resources/javascript/apps/')}/**/*`],
              verbose: false
            }),
            new CopyWebpackPlugin([{from: './package.json', to: ''}]),
            new CaseSensitivePathsPlugin()
        ],
        mode: 'development'
    };

    config.devtool = (argv.mode === 'production') ? 'source-map' : 'eval-source-map';

    if (argv.analyze) {
        config.devtool = 'source-map';
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
