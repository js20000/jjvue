import button from './components/jj/button'
import link from './components/jj/button/link'
import dialog from './components/jj/dialog'
import table from './components/jj/table'
import xlist from './components/jj/forms/xlist'
import xselect from './components/jj/forms/xselect'
import searchlist from './components/jj/search/searchlist'
import searchdate from './components/jj/search/searchdate'
import searchselect from './components/jj/search/searchselect'
import pagination from './components/jj/pagination/index'
import xinput from './components/jj/forms/xinput'
import xremote from './components/jj/forms/xremote'
import jj_xremote from './components/jj/search/searchremote'

const comment = {
  install: function(Vue) {
    Vue.directive('re-click', {
      inserted(el, binding) {
        el.addEventListener('click', () => {
          const target = event.target
          if (!target.reClick) {
            target.reClick = true
            setTimeout(() => {
              target.reClick = false
            }, binding.value || 1000)
          }
        })
      }
    })

    Vue.component('jj-table', table)
    Vue.component('jj-dialog', dialog)
    Vue.component('jj-button', button)
    Vue.component('jj-link', link)
    Vue.component('xlist', xlist)
    Vue.component('xselect', xselect)

    Vue.component('jj-list', searchlist)
    Vue.component('jj-date', searchdate)
    Vue.component('jj-xselect', searchselect)

    Vue.component('jj-page', pagination)
    Vue.component('jj-xinput', xinput)
    Vue.component('xremote', xremote)
    Vue.component('jj-xremote', jj_xremote)

    Vue.prototype.setFieldValue = function(data, path, value) {
        const _path = path.split('.')
        let obj
        for (let i = 0; i < _path.length; i++) {
          const x = _path[i]
          if (i == _path.length - 1) {
            obj[x] = value
          } else {
            obj = obj[x] || {}
          }
        }
    }
    Vue.prototype.getColValue = function(data) {
      let value = data.row
      if (data.column.templet) {
        value = data.column.templet(data)
      } else {
        const _path = data.column.field.split('.')
        for (let i = 0; i < _path.length; i++) {
          const x = _path[i]
          value = value[x] || ''
        }
      }
      return value
    }
    Vue.prototype.getAppendValue = function(data) {
      if (data.column && data.column.append) {
        if (typeof data.column.append === 'function') {
          return data.column.append.apply(this, [{ row: data.row, column: data.column }])
        }
        return data.column.append
      } else {
        return ''
      }
    }
    Vue.prototype.getFormatColValue = function(data, _fmt) {
      let rs = this.getColValue(data)
      if (_fmt) {
        rs = _fmt(rs)
      }
      rs += this.getAppendValue(data)
      if (data.column.link && rs !== '') {
        let listType
        if (typeof data.column.link === 'function') {
          listType = data.column.link.apply(this, [data])
        } else {
          listType = data.column.link
        }
        return `<a class="el-link el-link--${listType}" ><span class="el-link--inner">${rs}</span></a>`
      } else {
        return rs
      }
    }
    Vue.prototype.$g = function(f, s) {
      if (s == 'g' || s == 'G' || s == '克') {
        return parseFloat(f) / 1000 + 'KG'
      }
      return f + s
    }
    Vue.prototype.copyFrom = function(a, b) {
      const keys = Object.keys(b)
      for (const k of keys) {
        Vue.set(a, k, b[k])
      }
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

// 导出模块
export default comment
