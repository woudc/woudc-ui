module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'eslint:recommended',
    'plugin:vue/recommended',
    // 'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],
    'semi': ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-alert': 'error',
    'arrow-spacing': 'error',
    'vue/max-attributes-per-line': 'off',
    "vue/html-self-closing": ["warn", {
      "html": {
        "component": "any"
      }
    }]
  }
}
