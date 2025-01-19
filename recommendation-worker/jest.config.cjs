module.exports = {
  setupFiles: ['./jest.setup.cjs'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};