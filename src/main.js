import button from './components/jj/button'
import dialog from './components/jj/dialog'
import table from './components/jj/table'
import xlist from './components/jj/forms/xlist'
import xselect from './components/jj/forms/xselect'
import searchlist from './components/jj/search/searchlist'
import searchdate from './components/jj/search/searchdate'
import searchselect from './components/jj/search/searchselect'




const comment = {
  install: function(Vue) {
    Vue.component("jj-table",table )
    Vue.component("jj-dialog",dialog )
    Vue.component("jj-button",button )
    Vue.component("xlist",xlist )
    // Vue.component("xselect",xselect )
    Vue.component("jj-list",searchlist )
    Vue.component("jj-date",searchdate )
    Vue.component("jj-xselect",searchselect )

  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

// 导出模块
export default comment
