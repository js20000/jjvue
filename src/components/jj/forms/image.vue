<template>
  <el-image :src="url" :preview-src-list="urllist">
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
        data(){
            return {
                url:this.data.row[this.data.column.field],
                urllist:[
                    this.data.row[this.data.column.field]
                ]
            }
        },
        computed: {
        },
        mounted: function () {

        },
        methods: {}
    }
</script>

