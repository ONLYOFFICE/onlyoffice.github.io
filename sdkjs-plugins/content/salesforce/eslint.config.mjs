/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import js from '@eslint/js';
import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import { configs, plugins } from 'eslint-config-airbnb-extended';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = [
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  {
    rules: {
      'no-plusplus': 'off',
      'no-continue': 'off',
      'no-restricted-syntax': ['error', 'WithStatement'],
      'no-console': 'warn',
      'no-alert': 'warn',
      'radix': ['error', 'as-needed'],
      'no-await-in-loop': 'warn',
      '@stylistic/max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
    },
  },
];

const reactConfig = [
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  {
    settings: {
      react: {
        version: 'detect',
        pragma: 'h',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/require-default-props': 'off',
      'react/button-has-type': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-unused-prop-types': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
    },
  },
];

const typescriptConfig = [
  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.react.typescript,
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          filter: {
            regex: '^(access_token|instance_url)$',
            match: false,
          },
        },
      ],
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },
];

export default [
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...reactConfig,
  ...typescriptConfig,
  {
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-cycle': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'consistent-return': 'warn',
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
    },
  },
];
