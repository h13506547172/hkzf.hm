module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 开头报错的bug
    'space-before-function-paren': 'off',
    // 组件取名必须2个字
    'vue/multi-word-component-names': 'off',
    // 父传子双向绑定报错
    'vue/no-mutating-props': 'off'
  }
}
