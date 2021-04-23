module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    // using airbnb-typescript avoid: cannot read property 'loc' of undefined
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/68#issuecomment-585623820
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // No need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    // allow {...pageProps}
    'react/jsx-props-no-spreading': 'off',
    // another react needed
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',

    // allows a.map(b => b)
    'arrow-parens': 'off',

    'max-len': ['error', { code: 180 }],

    // allow last line of objects to not have comma
    '@typescript-eslint/comma-dangle': 'off',

    // todo: date-fns dependency: https://github.com/date-fns/date-fns/issues/1677
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { groups: ['index', 'external', 'sibling', 'parent', 'internal', 'builtin', 'object'] }],

    // /*********************** ON *********************************'

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
