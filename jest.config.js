module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "\\.(css|less|scss)$": "./src/jest/stub-transformer.js"
  },
  setupFilesAfterEnv:['<rootDir>/src/__test__/config/importJestDOM.ts']
};
