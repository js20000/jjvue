


import Vue from 'vue'

import Element from 'element-ui'

import App from './App'


Vue.use(Element, {
  size: 'medium'  // set element-ui default size
})


Vue.component('svg-icon', {
  name:"SvgIcon",
  props: ['icon-class'],
  render (createElement) {
    return createElement('span', "*")
  }
})
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import jj from './main'

Vue.use(jj);
Vue.prototype.$post = async function(url, para) {
  return new Promise((r,j)=>{r()})
}
Vue.config.productionTip = false
const errorHandler = (error, vm) => {
  console.error('抛出全局异常')
  console.error(vm)
  console.error(error)
}

Vue.config.errorHandler = errorHandler
Vue.prototype.clone = function(data) {
  return JSON.parse(JSON.stringify(data))
}
Vue.prototype.copyFrom = function(a, b) {
  const keys = Object.keys(b)
  for (const k of keys) {
    Vue.set(a, k, b[k])
  }
}
Vue.prototype.$throw = (error) => errorHandler(error, this)
init()

function init() {
  new Vue({
    el: '#app',
    mounted() {

    },
    render: h => h(App)
  })
}
