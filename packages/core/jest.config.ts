/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

const { defaults } = require('jest-config')

const config = Object.assign({}, defaults, {
  cache: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  passWithNoTests: true,
  globals: {
    __DEV__: true
  },
  transform: {
    "\\.[tj]sx?$": [
      'ts-jest', {
        tsconfig: '../../tsconfig.json',
        useESM: true
      }
    ]
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)/.+\\.js$']
})

module.exports = config
