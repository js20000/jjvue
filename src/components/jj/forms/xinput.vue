<template>
  <el-form-item v-if="data.column.field" :prop="data.column.field" :rules="rules">
      <el-input
        v-model="fieldValue"
      />
    </el-form-item>
</template>
<style>

</style>
<script>

export default {
  name: `jj-xinput`,
  props: ['data'],
  computed: {
    rules() {
      if (typeof this.data.column.rules == 'function') {
        return [{ validator: this.data.column.rules, value: this.$parent.getValue() }]
      }
      if (this.data.column.rules) {
         return this.data.column.rules.map(x => {
           return { ...x, value: this.$parent.getValue() }
         })
      } else { return [] }
    },
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
      }
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

