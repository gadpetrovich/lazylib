module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'xo',
    'plugin:import/warnings',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'simple-import-sort', 'prettier'],
  root: true,
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    indent: ['error', 2],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 2,
      },
    ],
    'eol-last': ['error', 'always'],
    'sort-imports': [
      'error',
      {
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};
