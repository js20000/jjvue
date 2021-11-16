<template>
  <div v-bind="$attrs">
    <el-pagination
      v-if="page.totalElements >page.size || page.size<999"
      :current-page="page.number+1"
      :page-sizes="[15,20,30,50,100, 200]"
      :page-size="page.size"
      :total="page.totalElements"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>

export default {
  name: `jj-pagination`,
  props: {
    page: {
      type: Object,
      default() {
        return { number: 0, size: 15 }
      }
    }
  },
  mounted: function() {
    if (this.page.number == undefined) { this.page.number = 0 }
    if (this.page.size == undefined) { this.page.size = 15 }
    // this.$emit('change', { page: this.page.number, limit: this.page.size })
  },
  methods: {
    refresh() {
      this.$emit('change')
    },
    handleSizeChange(val) {
      this.page.size = val
      this.page.number = 0
      this.$emit('change')
    },
    handleCurrentChange(val) {
      this.page.number = val - 1
      this.$emit('change')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
