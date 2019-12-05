<template>
  <div>
    <template v-if="column.type&&(column.type.indexOf('jj-')==0 )" >
      <component :is="column.type" :data="buildData()" @event="event" />
    </template>
    <template v-else-if="column.type&&(column.type.indexOf('sim-')==0 )" >
      <component :is="column.type" :value="filedValue" @event="event" />
    </template>
    <template v-else-if="column.templet&&(typeof column.templet === 'string')" >
      <component :is="column.templet" :data="buildData()" @event="event" />
    </template>
    <el-form-item v-else-if="index==editIndex && column.field &&!column.readOnly" :prop="column.field" :rules="column.rules?column.rules:[]">
      <el-input v-model="filedValue" size="small" />
    </el-form-item>
    <div v-else v-html="formatValue">
    </div>
  </div>
</template>

<script>

import listbtn from '@/components/jj/toolbar/listbtn'
import checkbox from '@/components/jj/forms/checkbox'
import yesno from '@/components/jj/forms/yesno'
import select from '@/components/jj/forms/select'
import image from '@/components/jj/forms/image'

export default {
  name: 'JjColumn',
  components: { 'jj-listbtn': listbtn, 'jj-checkbox': checkbox, 'jj-yesno': yesno, 'jj-select': select, 'jj-image': image },
  props: {
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
      const templet = this.column['templet']
      if (templet) {
        if (typeof templet === 'function') {
          return templet.apply(null, [{ row: this.row, column: this.column, index: this.index }])
        }
        return 'templet not imp'
      }

      return this.getValue()
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
        if (typeof rs === undefined) {
          this.$set(rs, key, '')
          return rs[key]
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
          if (typeof rs === undefined) {
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
      return { row: this.row, index: this.index, editIndex: this.editIndex, column: this.column }
    }

  }
}
</script>
<style rel="stylesheet/css">

</style>
