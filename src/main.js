import button from './components/jj/button'
import dialog from './components/jj/dialog'
import table from './components/jj/table'
import xlist from './components/jj/forms/xlist'
import jjxlist from './components/jj/search/searchlist'




const comment = {
  install: function(Vue) {
    Vue.component("jj-table",table )
    Vue.component("jj-dialog",dialog )
    Vue.component("jj-button",button )
    Vue.component("xlist",xlist )
    Vue.component("jj-list",jjxlist )

  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

// 导出模块
export default comment
