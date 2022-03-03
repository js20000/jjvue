<template>
  <div>
    <template v-if="xType" >
      <component :is="xType" :data="buildData()" @event="event" :class="cls" :style="style" @rowValueChange="rowValueChange" />
    </template>
    <xx-input v-else-if="index==editIndex && column.field &&!column.readOnly"  :data="buildData()" @event="event" :class="cls" :style="style" >
    </xx-input>
    <el-link
      :type="link"
      :class="cls"
      :style="style"
      v-else-if="column.event"
      v-re-click
      @click="on_click">
      {{formatValue}}
    </el-link>
    <div v-else v-html="formatValue">
    </div>
  </div>
</template>

<script>

import listbtn from '@/components/jj/toolbar/listbtn'
import listlink from '@/components/jj/toolbar/listlink'

import checkbox from '@/components/jj/forms/checkbox'
import yesno from '@/components/jj/forms/yesno'
import select from '@/components/jj/forms/select'
import image from '@/components/jj/forms/image'
import formitem from '@/components/jj/forms/formitem'
import xinput from '@/components/jj/forms/xinput'
import date from '@/components/jj/forms/date'
import datetime from '@/components/jj/forms/datetime'

export default {
  name: 'JjColumn',
  components: { 'xx-datetime': datetime, 'xx-date': date, 'xx-form-item': formitem, 'xx-input': xinput, 'xx-listbtn': listbtn, 'xx-listlink': listlink, 'jj-checkbox': checkbox, 'jj-yesno': yesno, 'jj-select': select, 'jj-image': image },
  props: {
    vm: {
      type: Object
    },
    column: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: -1
    },
    editIndex: {
      type: Number,
      default: -1
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {

    }
  },
  computed: {
    filedValue: {
      get: function() {
        return this.getValue()
      },
      set: function(value) {
        this.setValue(value)
      }
    },
    append() {
      if (this.column && this.column.append) {
        if (typeof this.column.append === 'function') {
          return this.column.append.apply(this, [{ row: this.row, column: this.column }])
        }
        return this.column.append
      } else {
        return false
      }
    },
    formatValue: function() {
      let rs = ''
      const templet = this.column['templet']
      if (templet) {
        if (typeof templet === 'function') {
          rs = templet.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
        } else { rs = 'templet not imp' }
      } else {
        rs = this.getValue()
      }
      if (this.column.append) {
        rs += this.append
      }
      if (!this.column.event && this.column.link && rs !== '') {
        const listType = this.link
        return `<a class="el-link el-link--${listType}" ><span class="el-link--inner">${rs}</span></a>`
      } else {
        return rs
      }
    },
   cls() {
     if (this.column.class) {
       if (typeof this.column.class === 'function') {
         return this.column.class.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
       }
       return this.column.class
     }
     return {}
   },
    style() {
      if (this.column.style) {
        if (typeof this.column.style === 'function') {
          return this.column.style.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
        }
        return this.column.style
      }
      return {}
    },
    link() {
      if (this.column.link) {
        if (typeof this.column.link === 'function') {
          return this.column.link.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
        }
        return this.column.link
      }
      return ''
    },
    xType() {
      if (this.column.type) {
        if (typeof this.column.type === 'function') {
          return this.column.type.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
        }
        return this.column.type
      }
      return ''
    }

  },
  watch: {
  },
  methods: {
    on_click() {
      if (event.target.reClick) { return }
      if (this.$store && this.$store.getters.loading) { return }
      this.$emit('event', { row: this.row, index: this.index, btn: this.column })
    },
    rowValueChange(data) {
      this.$emit('rowValueChange', data)
    },
    getValue() {
      let rs = this.row
      const keys = this.column.field.split('.')
      for (const key of keys) {
        rs = rs[key]
        if (rs === undefined) {
            return ''
        }
      }
      return rs
    },
    setValue(value) {
      let rs = this.row
      const keys = this.column.field.split('.')
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (i < keys.length - 1) {
          rs = rs[key]
          if (rs === undefined) {
            rs[key] = {}
            rs = rs[key]
          }
        } else { this.$set(rs, key, value) }
      }
    },
    event: function({ row, index, btn }) {
      this.$emit('event', { row, index, btn })
    },
    buildData: function() {
      const templet = this.column.data
      if (typeof templet === 'function') {
        this.column.data = templet.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
      }
      return { row: this.row, index: this.index, editIndex: this.editIndex, column: this.column }
}

  }
}
</script>
<style rel="stylesheet/css">

</style>
