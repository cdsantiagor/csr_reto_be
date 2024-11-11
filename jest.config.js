module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/tests/jest.setup.js'],
    testMatch: ['**/tests/**/*.test.ts'],
    testPathIgnorePatterns: ["<rootDir>/.aws-sam/"]
  };