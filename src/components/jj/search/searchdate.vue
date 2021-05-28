<!--suppress ALL -->
<template>
  <div  class="el-input el-input-group el-input--medium el-input-group--prepend el-input--suffix">
    <div class="el-input-group__prepend"  v-if="data.label">{{data.label}}</div>
    <div>
    <component
      ref="xx"
      :is="jjType"
      :type="type"
       style="width: 100%;"
      :placeholder="data.placeholder?data.placeholder:'日期'"
      :start-placeholder="data.start_placeholder?data.start_placeholder:'开始日期'"
      :end-placeholder="data.end_placeholder?data.end_placeholder:'结束日期'"
      :default-time="data.default_time"
      :format="fmt"
      :value-format="fmt"
      v-model="data.value"
      @change="xselect" >
    </component>
    </div>
  </div>

</template>
<style scoped>
  .el-icon-date{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-date-editor .el-range__close-icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<script>
  export default {
    name: 'SearchDate',
    components: {},
    props: {
      data: {
        type: Object,
        default() {
          return {
            data: {
              data: {}
            }
          }
        }
      }
    },
    mounted() {

        // this.$refs.xx.$set("type","year")
    },
    computed: {
      jjType() {
         return (this.data.data && this.data.data.el) ? this.data.data.el : 'el-date-picker'
      },
      type() {
        return (this.data.data && this.data.data.type) ? this.data.data.type : 'date'
      },
      fmt() {
        if (this.data.data && this.data.data.format) {
          return this.data.data.format
        }
        let fmt = 'yyyy-MM-dd'
        if (this.data.data && this.data.data.type && (this.data.data.type === 'datetime' || this.data.data.type === 'datetimerange')) {
          fmt = 'yyyy-MM-dd HH:mm:ss'
        }
        return fmt
      }
    },
    methods: {
      xselect() {
        this.$nextTick(function() {
          this.$emit('onSearch', this.data)
        })
      }

    }

  }

</script>
