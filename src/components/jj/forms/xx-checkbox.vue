<template>
  <div class="jj_switch">
    <xx-form-item v-if="data.index==data.editIndex && data.column.field" :data="data">
    <el-switch
        v-model="data.row[data.column.field]"
        active-value="1"
        inactive-value="0"
        active-text="是"
        inactive-text="否"/>
    </xx-form-item>
    <template v-else>
      {{ $parent.formatValue }}
    </template>
  </div>
</template>
<style>
.jj_switch .el-row {
  margin-bottom: 10px;

:last-child {
  margin-bottom: 0;
}

}
</style>
<script>
  import formitem from '@/components/jj/forms/xx-form-item'
export default {
  name: `jj-checkbox`,
  props: ['data'],
  components: { 'xx-form-item': formitem },
  mounted: function() {

  },
  methods: {
    rowValueChange() {
      this.$emit('rowValueChange', this.data)
    }

  }
}
</script>

