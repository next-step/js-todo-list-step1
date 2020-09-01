module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    "indent": ["error", 4],
    "semi": [2, "never"],
    "no-console": "error",
    "no-trailing-spaces": 1,
    "keyword-spacing": 1,
    "no-unused-vars": 1,
    "no-multiple-empty-lines": 1,
    "space-before-function-paren": 0,
    "eol-last": 1
  }
}
