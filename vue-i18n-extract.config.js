module.exports = {
  /* 
    Required (Glob files pattern)
    Do not include the entire src directory because vue-i18n-extract doesn't have a way to exclude directories
   */
  vueFiles: './src/{pages,layouts,components,composables,plugins}/**/*.?(ts|js|vue)',
  languageFiles: './locales/*.json',
  output: false,
  add: true,
  remove: false,
  ci: false,
  separator: '_',
}
