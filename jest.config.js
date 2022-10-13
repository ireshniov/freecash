module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: ['\\/test\\/.*\\.spec\\.ts'],
  testPathIgnorePatterns: ['.*.e2e\\.spec\\.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'dist', 'test'],
  modulePathIgnorePatterns: ['dist'],
  setupFiles: [
    '<rootDir>/node_modules/reflect-metadata/Reflect.js',
    '<rootDir>/jest.env.ts',
  ],
  forceExit: true,
  coverageReporters: ['lcov', 'text', 'text-summary'],
};
