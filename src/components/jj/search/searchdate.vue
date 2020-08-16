<!--suppress ALL -->
<template>
  <div  class="el-input el-input-group el-input--medium el-input-group--prepend el-input--suffix">
    <div class="el-input-group__prepend"  v-if="data.label">{{data.label}}</div>
    <div>
    <component
      ref="xx"
      :is="jjType"
      :type="type"
      :placeholder="data.placeholder?data.placeholder:'日期'"
      :start-placeholder="data.start_placeholder?data.start_placeholder:'开始日期'"
      :end-placeholder="data.end_placeholder?data.end_placeholder:'结束日期'"
      :default-time="data.default_time"
      v-model="data.value"
      @change="xselect" >
    </component>
    </div>
  </div>


</template>

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
