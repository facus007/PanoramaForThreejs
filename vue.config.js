'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pluginOptions: {},
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
    .rule('svg')
    .exclude.add(resolve('src/assets/icons'))
    .end()
    config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/assets/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
  },
  devServer: {
      host: '0.0.0.0',
      port: '8081',
      proxy: {
        "/vr": { // 图片上传代理
          target: 'http://29338808df.zicp.vip/manager', // 生产
          changeOrigin: true,
          // pathRewrite: {
          //   '^/vr': '/'
          // }
        },
        "/file-api":{
          target: 'https://manager.flycloudinfo.com/file-api',
          changeOrigin: true,
          pathRewrite: {
            '^/file-api': '/'
          }
        }
      },
      // https: true,
      disableHostCheck: true
    },
}
