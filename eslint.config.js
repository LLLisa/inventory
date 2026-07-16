// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // Test files legitimately place jest.mock() before imports (hoisting) and
    // use require() for controlled/isolated module loading.
    files: ['**/__tests__/**', '**/*.test.{ts,tsx,js}', 'jest.setup.ts'],
    rules: {
      'import/first': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
