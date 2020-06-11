'use strict'
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  pluginOptions: {},
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    plugins: [
      new CompressionPlugin({test: /\.js$|\.html$|\.css/, threshold: 10240, deleteOriginalAssets: false})
    ],
    // optimization: {
    //   minimize: true,
    //   minimizer: [new TerserPlugin({
    //     parallel: 4, // 并行打包
    //     terserOptions: {
    //       ecma: undefined,
    //       warnings: false,
    //       parse: {},
    //       compress: {
    //         drop_debugger: false,
    //         drop_console: true
    //       },
    //       mangle: true, // Note `mangle.properties` is `false` by default.
    //       module: false,
    //       output: null,
    //       toplevel: false,
    //       nameCache: null,
    //       ie8: false,
    //       keep_classnames: undefined,
    //       keep_fnames: false,
    //       safari10: false,
    //     }
    //   })],
    // }
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
      "/vr": {
        target: 'https://manager.flycloudinfo.com/prod-api/vr',
        changeOrigin: true,
        pathRewrite: {
          '^/vr': '/'
        }
      },
      "/base-url": {
        target: 'https://manager.flycloudinfo.com/prod-api',
        changeOrigin: true,
        pathRewrite: {
          '^/base-url': '/'
        }
      },
      "/file-api":{
        target: 'https://manager.flycloudinfo.com/file-api',
        changeOrigin: true,
        pathRewrite: {
          '^/file-api': '/'
        }
      },
      "/websources":{
        target: 'https://manager.flycloudinfo.com/websources',
        changeOrigin: true,
        pathRewrite: {
          '^/websources': '/'
        }
      },
    },
    // https: true,
    disableHostCheck: true
  },
}
