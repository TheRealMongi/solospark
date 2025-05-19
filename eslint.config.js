// @ts-check
// eslint-disable-next-line
/* eslint-env node */
// This file is treated as an ES module
import js from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import next from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Base JS config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': next,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactRecommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },
  // TypeScript specific rules
  ...typescriptEslint.configs.strictTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  // Next.js specific rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-unwanted-polyfillio': 'error',
    },
  },
  // Test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    env: {
      jest: true,
    },
    rules: {
      // Allow test utilities
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
