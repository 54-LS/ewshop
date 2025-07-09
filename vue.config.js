const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'utils':'@/utils',
        'views':'@/views'
      }
    }
  },
  publicPath: './'
}