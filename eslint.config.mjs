import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    extends: ['next', 'prettier'],
  }),
  {
    files: ['**/*.{ts,tsx}'],
    ...importPlugin.flatConfigs.typescript,
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            { pattern: 'next', group: 'builtin' },
            { pattern: 'react', group: 'builtin' },
            { pattern: '@/components/**', group: 'internal' },
            { pattern: '@/hooks/**', group: 'internal' },
            { pattern: '@/lib/**', group: 'internal' },
            { pattern: '@/types/**', group: 'internal' },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
    },
  },
];

export default eslintConfig;
