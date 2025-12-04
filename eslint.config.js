import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['next/core-web-vitals', 'plugin:import/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: [
      'simple-import-sort',
      'import',
      '@typescript-eslint',
      'react',
      'prettier',
      'react-hooks',
      'svg-jsx',
    ],
  }),
  {
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        browser: true,
        es2021: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          args: 'after-used',
        },
      ],
      'react/jsx-curly-brace-presence': 'error',
      'simple-import-sort/exports': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'off',
      'no-irregular-whitespace': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          shorthandFirst: true,
          callbacksLast: true,
          noSortAlphabetically: false,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', 'styled-components', 'immer', '^@?\\w'],
            ['^@(/.*|$)'],
            ['^(pages|common|store|application)'],
            ['^(modules)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^\\u0000'],
          ],
        },
      ],
      'svg-jsx/camel-case-dash': 'error',
      'svg-jsx/camel-case-colon': 'error',
      'svg-jsx/no-style-string': 'error',
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.eslintrc.json', // Игнорируем старый конфиг
    ],
  },
];

export default eslintConfig;
