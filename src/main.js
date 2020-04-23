import button from './components/jj/button'
import link from './components/jj/button/link'
import dialog from './components/jj/dialog'
import table from './components/jj/table'
import xlist from './components/jj/forms/xlist'
import xselect from './components/jj/forms/xselect'
import searchlist from './components/jj/search/searchlist'
import searchdate from './components/jj/search/searchdate'
import searchselect from './components/jj/search/searchselect'
import xinput from './components/jj/forms/xinput'

const comment = {
  install: function(Vue) {
    Vue.component('jj-table', table)
    Vue.component('jj-dialog', dialog)
    Vue.component('jj-button', button)
    Vue.component('jj-link', link)
    Vue.component('xlist', xlist)
    Vue.component('xselect', xselect)
    Vue.component('jj-list', searchlist)
    Vue.component('jj-date', searchdate)
    Vue.component('jj-xselect', searchselect)
    Vue.component('jj-xinput', xinput)

  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

// 导出模块
export default comment
