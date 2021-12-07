<template>
  <div class="jj-table">
    <jj-search @heightChange="calMaxHeight" :vm="$parent" v-if="!data.hiddenHeader" :searchs="data.searchs" @refresh="refresh" @onSearch="onSearch" :searchType="searchType"  @reset="reset">
      <slot name="searchs"/>
    </jj-search>
    <jj-toolbar v-if="!data.hiddenHeader" :data="data.toolbars"  @onSearch="onSearch" :searchs="data.searchs" @event="toolbarevent" :searchType="searchType" @refresh="refresh" @reset="reset" @resetPage="resetPage">
      <slot name="toolbar"/>
    </jj-toolbar>
    <slot name="tops"/>
    <div style="clear: both;"></div>
    <el-link icon="el-icon-setting" class="jj-setting" :underline="false" @click="setting" ></el-link>
    <el-form ref="tableform" :model="vdata">
      <el-table
        ref="table"
        @setting="setting"
        :border="border"
        :data="list"
        v-bind="$attrs"
        :fit="true"
        :row-class-name="rowClassName"
        :summary-method="getSumRow"
        :show-summary="_showSum"
        :default-sort="defaultSort()"
        tooltip-effect="dark"
        style="width: 100%"
        :max-height="_maxHeight"
        @sort-change="sort"
        @select="select"
        @select-all="selectAll"
        @header-dragend="headerDragend"
        @selection-change="SelectionChange">

        <el-table-column
          v-if="!data.hiddenIndex"
          type="index"
          fixed="left"
          width="50"
        />
        <el-table-column
          v-if="!data.hiddenSelection"
          type="selection"
          fixed="left"
          :selectable="checkSelectable"
          width="50"/>
        <el-table-column v-for="(column, index) in innerColumns" :type="column.type" :label="column.label" :width="getWidth(column,50)" :key="index" />
        <el-table-column
            v-for="(column, index) in outerColumns"
                          :type="getType(column)"
                          :label="column.label"
                          :width="getWidth(column,'')"
                          :key="index+1000"
                          :prop="column.field?column.field:''"
                          :align="column.align?column.align:'left'"
                          :fixed="column.fixed?column.fixed:false"
                          :sortable="column.sort?'custom':(column.sort==''?true:false)"
                          :render-header="column.renderHeader"

            :show-overflow-tooltip="typeof column.overflow=='undefined'?true:column.overflow"
        >
          <template slot-scope="scope">
            <jj-column :row="scope.row" :index="scope.$index" :column="column" :vm="$parent" :edit-index="editIndex" @event="event" @rowValueChange="rowValueChange"/>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <jj-pagination v-if="data.page && !(data.page instanceof Array) " :page="data.page" @change="refresh" :class="this.data.height == 'auto'?'jj-pagination-fixed':'jj-pagination'"/>

    <setting :result="settingResult" v-model="settingFlag" :id="tableId" v-if="settingFlag"  :columns="settingColumns"  @reset-col="resetCol"></setting>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import pagination from '@/components/jj/pagination'
import toolbar from '@/components/jj/toolbar'
import search from '@/components/jj/search'
import column from './column'
import setting from './setting'
export default {
  name: 'JjTable',
  components: { setting, 'jj-pagination': pagination, 'jj-toolbar': toolbar, 'jj-search': search, 'jj-column': column },
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    rowClassName: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    border: {
      type: Boolean,
      default: () => true
    },
    showSum: {
      type: Function,
      default: null
    },
    columns: {
      type: Array,
      default: () => []
    },
    settingID: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {
      maxHeight: 300,
      componentKey: 1,
      settingFlag: false,
      lastRefresh: -1,
      bak: {},
      editIndex: -1,
      multipleSelection: []
    }
  },
  computed: {
    _maxHeight() {
      if (this.data.height) { return this.maxHeight }
      return this.data.height
    },
    tableId() {
      return (this.$route ? this.$route.path : window.location.href.split(/\\?|#/)[0]) + this.settingID || ''
    },
    _showSum() {
      if (this.showSum) {
        return true
      }
      return !!this.$parent.showSum
    },
    searchType() {
      return this.data.searchType ? this.data.searchType : 0
    },
    innerColumns() {
      return this.columns.filter(column => (column.type == 'index' || column.type == 'selection'))
    },
    outerColumns() {
      let outCols = []
      const rs = JSON.parse(localStorage.getItem(this.tableId) || '[]')
      // console.log(rs)
      if (rs.length == 0 && this.componentKey > 0) { outCols = this.columns.filter(column => (column.type != 'index' && column.type != 'selection')) } else {
        const map = {}
        for (let i = 0; i < this.columns.length; i++) {
          const obj = this.columns[i]
         map[obj.label] = obj
        }
        for (const x of rs) {
          if (!x || !x.label) {
            return this.columns.filter(column => (column.type != 'index' && column.type != 'selection'))
          }
          const col = map[x.label]
          if (x._show && col && col.type != 'index' && col.type != 'selection') {
            col.width = x.width || 120
            col.fixed = x.fixed || ''
            outCols.push(col)
          }
        }
        if (this.componentKey < 0) { outCols = [] }
      }
      return outCols
    },
    selections() {
      return this.multipleSelection
    },
    list: function() {
      if (this.data.page) {
        if (this.data.page.content) { return this.data.page.content } else {
          if (this.data.page instanceof Array) { return this.data.page } else { return [] }
        }
      } else {
        return this.data.list
      }
    },
    vdata: function() {
      if (this.list.length > 0) { return this.list[0] } else return {}
    },
    settingResult() {
      if (this.settingFlag) { return JSON.parse(localStorage.getItem(this.tableId) || '[]') } else { return JSON.parse(localStorage.getItem(this.tableId) || '[]') }
    },
    settingColumns() { // 排序显示
      const settings = this.settingResult
      const map = {}
      const rs = []
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i]
        map[col.label] = col
      }
      for (const x of settings) {
        const col = map[x.label]
        if (col) {
          rs.push({ label: col.label, width: x.width, fixed: x.fixed ? x.fixed : '', _show: x._show })
          map[x.label] = null
        }
      }
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i]
        if (map[col.label]) {
          rs.push({ label: col.label, width: col.width, fixed: col.fixed ? col.fixed : '', _show: (settings.length == 0) })
        }
      }
      return rs
    }

  },
  mounted() {
    this.$nextTick(() => {
      this.calMaxHeight()
    })
  },
  methods: {
    calMaxHeight() {
      if (this.data.height == 'auto') {
        const offsetTop = this.$refs.table.$el.getBoundingClientRect().top

        this.maxHeight = window.innerHeight - offsetTop - 32
      } else {
        this.maxHeight = this.data.height
      }
    },
    resetCol(result) {
      localStorage.setItem(this.tableId, JSON.stringify(result))
      this.$set(this, 'componentKey', ++this.componentKey)
      // console.log(this.componentKey)
    },
    headerDragend(newWidth, oldWidth, column, event) {
      const rs = []
      for (let i = 0; i < this.settingColumns.length; i++) {
        const col = this.settingColumns[i]
        if (col.label == column.label) {
          col.width = newWidth
        }
        rs.push({ label: col.label, key: col.label, fixed: col.fixed ? col.fixed : '', width: col.width, _show: col._show })
      }
      localStorage.setItem(this.tableId, JSON.stringify(rs))
    },
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      this.$emit('select-all', selection)
    },
    checkSelectable(row, index) {
      if (this.data.checkSelectable) {
        return this.data.checkSelectable(row, index)
      }
      return true
    },
    rowValueChange(data) {
      this.$emit('rowValueChange', data)
    },
     getSumRow() {
       if (this.showSum) {
         return this.showSum(this)
       }
       if (this.$parent.showSum) { return this.$parent.showSum(this) } else { return ['合计'] }
    },
    getColIndex(field, label) {
      let d = 0
      if (!this.data['hiddenIndex']) {
        d++
      }
      if (!this.data['hiddenSelection']) {
       d++
      }
      let pos = -1
      let left = 0
      let right = 0
      let allLeft = 0
      let allRight = 0
      for (let i = 0; i < this.outerColumns.length; i++) {
        const x = this.outerColumns[i]

        if (x.field && x.field == field) {
          pos = i
        } else if (x.label && x.label == label) {
          pos = i
        }
        if (pos < 0) {
          if (x.fixed == 'right') {
            right++
          } else if (x.fixed == 'left') {
            left++
          }
        }
        if (x.fixed == 'right') {
          allRight++
        } else if (x.fixed == 'left') {
          allLeft++
        }
      }
      if (pos >= 0) {
        const x = this.outerColumns[pos]
        if (x.fixed == 'right') {
          return this.outerColumns.length - allRight + right + d
        } else {
          if (x.fixed == 'left') {
              return left + d
          } else {
            return pos - right + (allLeft - left) + d
          }
        }
      }

      return -1
    },
    onSearch(data) {
      if (this.data.searchType == 1) {
        this.refresh()
        return
      }
      this.$emit('onSearch', data)
    },
    getValue(row, column) {
      let rs = row
      if (column.field) {
        const keys = column.field.split('.')
        for (const key of keys) {
          rs = rs[key]
          if (rs === undefined) { return '' }
        }
        return rs
      }
    },
    setValue(row, column, value) {
      let rs = row
      if (column.field) {
        const keys = column.field.split('.')
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          if (i < keys.length - 1) {
            const sub = rs[key]
            if (typeof sub == 'undefined') {
              rs[key] = {}
              rs = rs[key]
            } else { rs = sub }
          } else { rs[key] = value }
        }
      }
    },
    getWidth(column) {
      if (column.width) { return column.width }
      if (column.type == 'expand' || column.type == 'index' || column.type == 'selection') { return 50 }
      return ''
    },
    getType(column) {
      if (!column.type || typeof column.type === 'function' || column.type.indexOf('jj-') == 0) { return '' }
      return column.type
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          this.$emit('drag', evt)

          // const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          // this.list.splice(evt.newIndex, 0, targetRow)
          //
          // // for show the changes, you can delete in you code
          // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          // this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    // invoke by parent
    validate() {
      return this.$refs.tableform.validate()
    },
    // invoke by parent
    add() {
      if (this.editIndex >= 0) {
        this.$message.error('请先完成上一次的编辑')
        return
      }
      const row = {}
      for (const i in this.columns) {
        const col = this.columns[i]
        this.setValue(row, col, null)
      }
      this.list.unshift(row)
      this.edit(0)
      return row
    },
    // invoke by parent
    edit(editIndex) {
      this.editIndex = editIndex

      if (editIndex >= 0) {
        const row = this.list[editIndex]
        if (row) {
          this.bak = JSON.parse(JSON.stringify(row))
        }
      }
    },
    restore() {
      if (this.editIndex >= 0) {
        const row = this.list[this.editIndex]
        if (row) {
          if (!row.id) {
            this.list.splice(this.editIndex, 1)
          } else {
            for (const i in this.columns) {
              const col = this.columns[i]
              this.setValue(row, col, this.getValue(this.bak, col))
            }
          }
        }
        this.editIndex = -1
      }
    },
    SelectionChange(val) {
      // console.info(val)
      this.multipleSelection = val
      if (this.data.toolbars) {
        this.data.toolbars.forEach(x => {
          if (x.needRow) {
            x.disabled = (val.length != x.needRow)
            if (x.needRow > 10) {
              x.disabled = (val.length == 0)
            }
          }
        })
      }

      this.$emit('selection-change', val)
    },
    event: function({ row, index, btn }) {
      if (btn.event) { this.$emit(btn.event, { row, index, btn }) } else console.error('发现未定义事件')
    },
    toolbarevent: function({ btn }) {
      if (btn.event) { this.$emit(btn.event, { selections: this.multipleSelection, btn }) } else console.error('发现未定义事件')
    },
    search: function() {
      let rs = {}
      if (this.data.page && this.data.page.size) { rs = { page: this.data.page.number, limit: this.data.page.size } }
      if (this.data.searchs) {
        for (const s of this.data.searchs) {
          if (s.onPost) {
            s.onPost.apply(this.$parent, [{ search: s, data: rs }])
            continue
          }
          if (!(s.value === '') && !(typeof s.value == 'undefined')) {
            rs[s.field] = s.value
          }
        }
      }
      const ss = []
      if (this.data.sorts) {
        for (const s in this.data.sorts) {
          if (this.data.sorts[s] == 'ascending') { ss.push(`asc_${s}`) } else { ss.push(`desc_${s}`) }
        }
      }
      rs.sort = ss
      // 组装检索的keys
      const keys = []
      this.columns.forEach(item => {
        if (item.search && item.search === true) {
          keys.push(item.field)
        }
      })
      if (this.data.sumcol) { rs.sumcol = this.data.sumcol }
      rs.keys = keys.toString()
      return rs
    },
    sort: function({ column, prop, order }) {
      if (prop) {
        this.data.sorts = {}
        this.data.sorts[prop] = order
      }
      if (column.sortable == 'custom') { this.refresh() }
    },
    refresh: function() {
      const i = new Date().getTime()
      if (i - this.lastRefresh > 500) {
        this.restore()
        const data = this.search()
        this.lastRefresh = i
        this.$emit('refresh', data)
      }
    },
    setting() {
        this.settingFlag = true
    },
    defaultSort: function() {
      if (this.data.sorts) {
        for (const s in this.data.sorts) {
          return { prop: s, order: this.data.sorts[s] }
        }
      }
      return {}
    },
    reset: function() {
      const rs = {}
      if (this.data.searchs) {
        for (let i = 0; i < this.data.searchs.length; i++) {
          const s = this.data.searchs[i]
          if (s.default !== undefined) { s.value = s.default } else {
            s.value = ''
          }
          if (s.disValue) { s.disValue = '' }
          this.$set(this.data.searchs, i, s)
        }
      }
      this.refresh()
      return rs
    },
    resetPage: function() {
      if (this.data.page && !(this.data.page instanceof Array)) {
        if (this.data.page.number) { this.data.page.number = 0 }
      }
    },
    getExportDom() {
      const rules = []
      let d = 0
      if (!this.data['hiddenIndex']) {
        rules.push(d++)
      }
      if (!this.data['hiddenSelection']) {
        rules.push(d++)
      }

      for (let i = 0; i < this.columns.length; i++) {
        const x = this.columns[i]
        if (x['noExport'] || x.label == '操作') {
          rules.push(i + d)
        }
      }
      const tableDom = this.$refs.table.$el.cloneNode(true)
      const fix = tableDom.querySelector('.el-table__fixed-right')
      if (fix) { fix.remove() }
      const tr_objs = tableDom.getElementsByTagName('tr')
      const removes = []
      for (let i = 0; i < tr_objs.length; i++) {
        const x = tr_objs[i]
        const th_objs = x.getElementsByTagName('th')
        for (let i1 = 0; i1 < th_objs.length; i1++) {
          if (rules.includes(i1)) { removes.push(th_objs[i1]) }
        }
        const td_objs = x.getElementsByTagName('td')
        for (let i1 = 0; i1 < td_objs.length; i1++) {
          if (rules.includes(i1)) { removes.push(td_objs[i1]) }
        }
      }
      for (let i = 0; i < removes.length; i++) {
        const x = removes[i]
        x.remove()
      }
      return tableDom
    }
  }
}
</script>
<style scoped>
  .sortable-ghost {
    opacity: 0.4;
    background-color: #F4E2C9;
  }
  .jj-setting{
    float: right;
    top:30px;
    z-index: 101;
    padding-right: 10px;
  }

</style>
