module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-var': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/component-api-style': [
      'error',
      ['script-setup', 'composition'] // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/no-multi-spaces': [
      'error',
      {
        ignoreProperties: false
      }
    ]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
/*   "prettier/prettier": [
    "error",
    {
      "semi": false,
      "singleQuote": true,
      endOfLine: "auto",
    },
  ], */
}
