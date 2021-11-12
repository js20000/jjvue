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
    config.set('externals', {
      'axios': 'axios',
      'babel-polyfill': 'babel-polyfill',
      'clipboard': 'clipboard',
      'codemirror': 'codemirror',
      'core-js': 'core-js',
      'echarts': 'echarts',
      'element-ui': 'element-ui',
      'eslint': 'eslint',
      'file-saver': 'file-saver',
      'fuse.js': 'fuse.js',
      'js-base64': 'js-base64',
      'js-cookie': 'js-cookie',
      'moment': 'moment',
      'nprogress': 'nprogress',
      'number-precision': 'number-precision',
      'qs': 'qs',
      'screenfull': 'screenfull',
      'security-view-deal': 'security-view-deal',
      'swiper': 'swiper',
      'vue': 'vue',
      'vue-i18n': 'vue-i18n',
      'vue-print-nb': 'vue-print-nb',
      'vue-quill-editor': 'vue-quill-editor',
      'vue-router': 'vue-router',
      'vuex': 'vuex',
      'xlsx': 'xlsx'
    })
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
