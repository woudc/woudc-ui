module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  // add your custom rules here
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
  globals: {
    $nuxt: true, // prevent "no-undefined variables" when accessing $nuxt
  },
}
