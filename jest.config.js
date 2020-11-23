module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/unit/setup.js'],
  testMatch: ['<rootDir>/tests/unit/**/*.spec.js']
};
