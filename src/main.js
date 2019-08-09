import button from './components/jj/button'
import dialog from './components/jj/dialog'
import table from './components/jj/table'




const comment = {
  install: function(Vue) {
    Vue.component("jj-table",table )
    Vue.component("jj-dialog",dialog )
    Vue.component("jj-button",button )
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

// 导出模块
export default comment
