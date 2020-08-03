<template>
  <div >
    <jj-search v-if="!data.hiddenHeader" :searchs="data.searchs" @refresh="refresh" @onSearch="onSearch" :searchType="searchType">
      <slot name="searchs"/>
    </jj-search>
    <jj-toolbar v-if="!data.hiddenHeader" :data="data.toolbars"  @onSearch="onSearch" :searchs="data.searchs" @event="toolbarevent" :searchType="searchType" @refresh="refresh" @reset="reset" >
      <slot name="toolbar"/>
    </jj-toolbar>
    <slot name="tops"/>
    <el-form ref="tableform" :model="vdata" >
      <el-table
        ref="table"
        :border="border"
        :data="list"
        v-bind="$attrs"
        :fit="true"
        :summary-method="getSumRow"
        :show-summary="showSum"
        :default-sort="defaultSort()"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sort"
        @selection-change="SelectionChange">

        <el-table-column
          v-if="!data.hiddenIndex"
          type="index"
          width="50"/>
        <el-table-column
          v-if="!data.hiddenSelection"
          type="selection"
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
                          :show-overflow-tooltip="column.overflow?true:false"
        >
          <template slot-scope="scope">
            <jj-column :row="scope.row" :index="scope.$index" :column="column" :vm="$parent" :edit-index="editIndex" @event="event" @rowValueChange="rowValueChange"/>
          </template>
        </el-table-column>

      </el-table>
    </el-form>
    <jj-pagination v-if="data.page && !(data.page instanceof Array) " :page="data.page" @change="refresh"/>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import pagination from '@/components/jj/pagination'
import toolbar from '@/components/jj/toolbar'
import search from '@/components/jj/search'
import column from './column'

export default {
  name: `jj-table`,
  components: { 'jj-pagination': pagination, 'jj-toolbar': toolbar, 'jj-search': search, 'jj-column': column },
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    border: {
      type: Boolean,
      default: () => true
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      bak: {},
      editIndex: -1,
      multipleSelection: []
    }
  },
  computed: {
    showSum() {
      return !!this.$parent.showSum
    },
    searchType() {
      return this.data.searchType ? this.data.searchType : 0
    },
    innerColumns() {
      return this.columns.filter(column => column.type && (column.type == 'index' || column.type == 'selection'))
    },
    outerColumns() {
      return this.columns.filter(column => !column.type || (column.type != 'index' && column.type != 'selection'))
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
      if (this.editIndex >= 0) { return this.list[this.editIndex] } else { return {} }
    }

  },
  mounted() {

  },
  methods: {
    rowValueChange(data) {
      this.$emit('rowValueChange', data)
    },
     getSumRow() {
       if (this.$parent.showSum) { return this.$parent.showSum() } else { return ['合计'] }
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
      if (!column.type || column.type.indexOf('jj-') == 0) { return '' }
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
          if (!(s.value === '') && !(typeof s.value == 'undefined')) { rs[s.field] = s.value }
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
      this.restore()
      const data = this.search()
      this.$emit('refresh', data)
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
          s.value = s.default || ''
          if (s.disValue) { s.disValue = '' }
          this.$set(this.data.searchs, i, s)
        }
      }
      this.refresh()
      return rs
    }
  }
}
</script>
<style scoped>
  .sortable-ghost {
    opacity: 0.4;
    background-color: #F4E2C9;
  }

</style>
