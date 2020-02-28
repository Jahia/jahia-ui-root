module.exports = {
    modulePaths: [
        '<rootDir>/src/javascript/'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/javascript/__mocks__/fileMock.js',
        '\\.svg$': '<rootDir>/src/javascript/__mocks__/svgMock.js'
    },
    testEnvironment: './integrationTests/customEnv.js',
    globalSetup: './integrationTests/setup.js',
    globalTeardown: './integrationTests/teardown.js',
    reporters: [
        'default',
        './integrationTests/reporter.js'
    ],
    testTimeout: 30000
};
