const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'dev.js',
      // 模板来源
      template: 'index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  outputDir: './dist',
  lintOnSave: undefined,
  runtimeCompiler: true,
  chainWebpack: config => {
    // config.set('externals', {
    //   'axios': 'axios',
    //   'babel-polyfill': '^6.26.0',
    //   'clipboard': 'clipboard',
    //   'codemirror': 'codemirror',
    //   'core-js': '^3.6.5',
    //   'echarts': 'echarts',
    //   'element-ui': '^2.13.2',
    //   'eslint': 'eslint',
    //   'file-saver': '2.0.5',
    //   'fuse.js': '^6.4.6',
    //   'js-base64': '3.6.1',
    //   'js-cookie': '^2.2.1',
    //   'moment': 'moment',
    //   'nprogress': 'nprogress',
    //   'number-precision': '^1.5.0',
    //   'qs': 'qs',
    //   'screenfull': 'screenfull',
    //   'security-view-deal': '^0.2.3',
    //   'swiper': 'swiper',
    //   'vue': 'vue',
    //   'vue-i18n': '^8.25.0',
    //   'vue-print-nb': '^1.7.4',
    //   'vue-quill-editor': '^3.0.6',
    //   'vue-router': '^3.3.4',
    //   'vuex': 'vuex',
    //   'xlsx': 'xlsx'
    // })
    config.resolve.extensions.add('.js').add('.vue').add('.css')
    config.resolve.alias
      .set('@assets', resolve('./assets'))
  },
  productionSourceMap: process.env.NODE_ENV === 'dev',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
    resolve: {
      alias: {
        '@': resolve('./')
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:28030',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL~
        changeOrigin: false,
        pathRewrite: {
          '^/api': '' // 思路是如果是开发环境，就给所有要代理的接口统一加上前缀，然后代理请求时再统一通过rewrite去掉
        }

      }
    }
  }
}
