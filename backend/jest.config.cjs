/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  // Focus coverage on the PUBLIC API surface:
  collectCoverageFrom: [
    'dist/app.js',
    'dist/controllers/**/*.js',
    'dist/validators/**/*.js'
  ],
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 }
  }
};
