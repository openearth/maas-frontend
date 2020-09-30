module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/unit/jest.stub.js'],
  moduleFileExtensions: ['js', 'vue', 'json', 'md'],
  collectCoverageFrom: ['<rootDir>/src/**/*.vue', '<rootDir>/src/**/*.js']
}
