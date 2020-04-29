<template>
  <div>
    <el-form-item
      v-if="data.index==data.editIndex && data.column.field"
      :prop="data.column.field"
      :rules="data.column.rules?data.column.rules:[]">
      <el-select v-model="fieldValue" filterable placeholder="请选择">
        <el-option
          v-for="item in data.column.data"
          :key="item.val"
          :label="item.label"
          :value="item.val"/>
      </el-select>

    </el-form-item>

    <div v-else v-html="formatValue">
    </div>
  </div>
</template>
<style>

</style>
<script>

export default {
  name: `jj-select`,
  props: ['data'],
  data() {
    return {
      list: []
    }
  },
  computed: {
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
      }
    },
    formatValue() {
      return this.$parent.formatValue
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

