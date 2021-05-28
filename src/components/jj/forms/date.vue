<template>
  <div>
    <jj-form-item v-if="data.index==data.editIndex && data.column.field" :data="data">
      <el-date-picker
        style="width: 100%;"
        v-model="fieldValue"
        :type="date"
      />

    </jj-form-item>

    <template v-else>
      {{val}}
    </template>
  </div>
</template>
<style>

</style>
<script>
  import formitem from '@/components/jj/forms/formitem'
  import { parseTime } from '@/utils'

export default {
  name: `jj-date`,
  props: ['data'],
  components: { 'jj-form-item': formitem },
  computed: {
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
      }
    },
    val() {
      return parseTime(this.fieldValue, this.format)
    },
    date() {
       return (this.data.column.data && this.data.column.data.type) ? this.data.column.data.type : 'date'
    },
    format() {
      if (this.data.column.data && this.data.column.data.format) { return this.data.column.data.format }
      return this.date == 'date' ? '{y}-{m}-{d}' : '{y}-{m}-{d} {h}:{i}:{s}'
    }
  },
  mounted: function() {

  },
  methods: {
    rowValueChange() {
      this.$emit('rowValueChange', this.data)
    }

  }
}
</script>

