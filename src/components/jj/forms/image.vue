<template>
  <el-image :src="data.row[data.column.field]" :preview-src-list="data.row[data.column.field]">
    <div slot="error" class="image-slot">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>
<style>
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
  }
</style>
<script>

    export default {
        name: `jj-image`,
        props: ['data'],
        computed: {
        },
        mounted: function () {

        },
        methods: {}
    }
</script>

