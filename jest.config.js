module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ['text', 'lcov'],
    verbose: true,
    testMatch: ['**/tests/**/*.spec.js', '**/services/**/*.spec.js'], // Added services folder
    moduleFileExtensions: ['js', 'json', 'node'],
};
