<template>
  <jj-form-item  :data="data">
      <el-input
        :class="xClass"
        :disabled="disabled"
        v-model="fieldValue">
        <template slot="append" v-if="data.column.append">{{append}}</template>
      </el-input>
  </jj-form-item>
</template>
<style>
.jj-xinput-right input{
  text-align: right;
}
</style>
<script>
import formitem from '@/components/jj/forms/formitem'

export default {
  name: `jj-xinput`,
  props: ['data'],
  components: { 'jj-form-item': formitem },
  computed: {
    append() {
      if (this.data.column && this.data.column.append) {
        if (typeof this.data.column.append === 'function') {
          return this.data.column.append.apply(this, [{ row: this.data.row, column: this.data.column }])
        }
        return this.data.column.append
      } else {
        return false
      }
    },
    disabled() {
      if (this.data.column && this.data.column.disabled) {
        if (typeof this.data.column.disabled === 'function') {
          return this.data.column.disabled.apply(this, [{ row: this.data.row, column: this.data.column }])
        }
        return !!this.data.column.disabled
      } else {
        return false
      }
    },
    xClass() {
      let cls = ''
      if (this.data.column) {
        if (this.data.column.xclass) {
          cls = this.data.column.xclass
        }
        if (this.data.column.align == 'right') {
          cls += 'jj-xinput-right'
        }
      }
      return cls
    },
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
        this.$emit('rowValueChange', this.data)
      }
    }
  },
  mounted: function() {

  },
  methods: {

  }
}
</script>

