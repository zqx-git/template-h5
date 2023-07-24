/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    './.eslintrc-auto-import.json',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  globals: {
    __AAA__: 'readonly',
    process: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'eol-last': ['error', 'always'],
    'handle-callback-err': ['error', 'err'],
    indent: ['error', 2],
    'lines-between-class-members': ['error', 'never'],
    'multiline-ternary': ['off'],
    'no-async-promise-executor': ['off'],
    'no-console': ['off'],
    'no-extend-native': ['off'],
    'no-new': ['off'],
    'no-proto': ['off'],
    'no-return-assign': ['off'],
    'no-sequences': ['off'],
    'no-tabs': ['off'],
    'no-unreachable': ['off'],
    'no-useless-constructor': ['off'],
    'no-var': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    quotes: ['error', 'single'], // 尽可能使用单引号double
    'no-extra-semi': ['error'], // 禁止不必要的分号
    semi: ['error', 'never'], // 末尾无需分号
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'switch-colon-spacing': ['error'],
    'vue/component-definition-name-casing': ['error', 'kebab-case'], // vue
    'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }], // vue
    'vue/html-indent': ['error', 2], // vue
    'vue/html-self-closing': ['off'], // vue
    'vue/max-attributes-per-line': ['off'], // vue
    'vue/multi-word-component-names': ['off'], // vue
    'vue/mustache-interpolation-spacing': ['error', 'always'], // vue
    'vue/singleline-html-element-content-newline': ['off'] // vue
  }
}
