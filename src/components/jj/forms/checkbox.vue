<template>
  <div>
    <el-form-item
      v-if="data.index==data.editIndex && data.column.field"
      :prop="data.column.field"
      :rules="data.column.rules?data.column.rules:[]">
      <el-switch
        v-model="data.row[data.column.field]"
        active-value="1"
        inactive-value="0"
        active-text="是"
        inactive-text="否"/>
    </el-form-item>
    <template v-else>
      {{ $parent.formatValue }}
    </template>
  </div>
</template>
<style>
  .el-row {
    margin-bottom: 10px;

  :last-child {
    margin-bottom: 0;
  }

  }
</style>
<script>

export default {
  name: `jj-checkbox`,
  props: ['data'],
  mounted: function() {

  },
  methods: {
    rowValueChange() {
      this.$emit('rowValueChange', this.data)
    }

  }
}
</script>

