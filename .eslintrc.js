module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'semi': ['error', 'always'],
    'comma-dangle': [
      'error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'ignore',
      },
    ],
    'eqeqeq': ['error', 'always'],
    'dot-location': ['error', 'property'],
    'vue/html-self-closing': [
      'error', {
        'html': {
          'void': 'never',
          'normal': 'ignore',
          'component': 'always',
        },
        'svg': 'always',
        'math': 'always',
      },
    ],
    'vue/script-indent': [
      'error', 2, {
        'baseIndent': 1,
      },
    ],
    'vue/eqeqeq': ['error', 'always'],
    'vue/this-in-template': ['error', 'never'],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { 'before': true, 'after': true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
    'vue/camelcase': [
      'error',
      {
        'properties': 'always',
        'ignoreDestructuring': true,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error', 'kebab-case', {
        'registeredComponentsOnly': true,
      },
    ],
    'vue/key-spacing': ['error'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/v-on-function-call': 'error',
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off',
      },
    },
  ],
};
