module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    'transform-remove-strict-mode'
  ],
  ignore: ['./src/lib/mui/js/mui.js', './src/lib/mui/js/mui.min.js']
}
