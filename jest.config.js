const jestConfig = require('@jahia/test-framework').jestConfig;

jestConfig.moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    '@jahia/moonstone': '<rootDir>/node_modules/@jahia/moonstone/dist/index.cjs'
};
module.exports = jestConfig;
