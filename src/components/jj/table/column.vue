<template>
  <div>
    <template v-if="column.type&&(column.type.indexOf('jj-')==0 )" >
      <component :is="column.type" :data="buildData()" @event="event" :class="cls" :style="style" />
    </template>

    <template v-else-if="column.templet&&(typeof column.templet === 'string')" >
      <template v-if="column.templet.indexOf('sim-')==0 " >
        <component :is="column.templet" :data="filedValue" @event="event" :class="cls" :style="style" />
      </template>
      <template v-else>
        <component :is="column.templet" :data="buildData()" @event="event" :class="cls" :style="style" />
      </template>

    </template>
    <jj-xinput v-else-if="index==editIndex && column.field &&!column.readOnly"  :data="buildData()" @event="event" :class="cls" :style="style" >
    </jj-xinput>
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
  components: { 'jj-datetime': datetime, 'jj-date': date, 'jj-form-item': formitem, 'jj-xinput': xinput, 'jj-listbtn': listbtn, 'jj-listlink': listlink, 'jj-checkbox': checkbox, 'jj-yesno': yesno, 'jj-select': select, 'jj-image': image },
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
      if (this.column.link) {
        let listType = this.column.link
        if (typeof this.column.link === 'function') {
          listType = this.column.link.apply(this.vm, [{ row: this.row, column: this.column, index: this.index }])
        }
        return `<a class="el-link el-link--${listType}" ><span class="el-link--inner">${rs}</span></a>`
      } else { return rs }
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
    }

  },
  watch: {
  },
  methods: {
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
