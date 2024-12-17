import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import * as tanstackQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: { jsx: true },
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tanstackQuery.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.scss'],
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
