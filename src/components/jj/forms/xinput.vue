<template>
  <div>
    <el-form-item v-if="data.column.field" :prop="data.column.field" :rules="data.column.rules?data.column.rules:[]">
      <el-input
        v-model="fieldValue"
      />
    </el-form-item>
  </div>
</template>
<style>

</style>
<script>

export default {
  name: `jj-checkbox`,
  props: ['data'],
  computed: {
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
      }
    },
    active() {
      const data = this.data.column.data
      if (data) {
        return data[0][0] ? data[0] : data[1]
      } else {
        return [1, '']
      }
    },
    inactive() {
      const data = this.data.column.data
      if (data) {
        return data[0][0] ? data[1] : data[0]
      } else {
        return [0, '']
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

