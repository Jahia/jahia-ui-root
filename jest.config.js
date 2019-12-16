module.exports = {
    modulePaths: [
        "<rootDir>"
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/javascript/__mocks__/fileMock.js',
        '\\.svg$': '<rootDir>/src/javascript/__mocks__/svgMock.js'
    },
    testResultsProcessor: 'jest-teamcity-reporter'
};
