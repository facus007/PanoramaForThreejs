'use strict'
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  pluginOptions: {},
  configureWebpack: config => {
    // config.optimization = {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 20000,
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name (module) {
    //           // get the name. E.g. node_modules/packageName/not/this/part.js
    //           // or node_modules/packageName
    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //           // npm package names are URL-safe, but some servers don't like @ symbols
    //           return `package.${packageName.replace('@', '')}`
    //         }
    //       }
    //     }
    //   }
    // }
    config.plugins.push(new CompressionPlugin({test: /\.js$|\.html$|\.css/, threshold: 10240, deleteOriginalAssets: false}))
  },
  pages: {
    instance: 'src/pages/instance/main.js',
    index: 'src/pages/index/main.js',
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
    if(process.env.use_analyzer){
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    config.plugins.delete('prefetch-index')
    config.plugins.delete('preload-index');
    config.plugins.delete('prefetch-instance');
    config.plugins.delete('preload-instance');
  },
  devServer: {
    host: '0.0.0.0',
    port: '8081',
    proxy: {
      "^/vr": {
        target: 'https://manager.flycloudinfo.com/prod-api/vr',
        changeOrigin: true,
        pathRewrite: {
          '^/vr': '/'
        }
      },
      "^/base-url": {
        target: 'https://manager.flycloudinfo.com/prod-api',
        changeOrigin: true,
        pathRewrite: {
          '^/base-url': '/'
        }
      },
      "^/file-api":{
        target: 'https://manager.flycloudinfo.com/file-api',
        changeOrigin: true,
        pathRewrite: {
          '^/file-api': '/'
        }
      },
      "^/websources":{
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
