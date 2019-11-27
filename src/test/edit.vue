<!--suppress ALL -->
<template>
  <el-form ref="dataForm" :model="obj" label-width="80px" >
    <el-form-item label="格式">
      <el-input v-model="obj.sfromat" placeholer="yymmdd0000"/>
    </el-form-item>

    <el-form-item  label="后缀" >
      <xlist :url="list" dis-field="name" val-field="id" default-val=""/>
    </el-form-item>
    <el-form-item label="后缀" >
      <xselect v-model="xselect" :force="false" :data="list" val-field="id" dis-field="name" placeholder="请选择"/>
    </el-form-item>

  </el-form>
</template>
<style>

</style>

<script>

export default {
  name: 'SequenceEdit',
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {},
        list:[
            {id:1,name:'选择一'},
            {id:2,name:'选择二'},
            {id:3,name:'选择三'},
            {id:4,name:'选择四',disabled:true},
            {id:5,name:'选择五'}
        ],
        xselect:''
    }
  },
  computed: {
    obj() {
      return this.data
    }
  },
  watch: {

  },
  methods: {
    async validate() {
      await this.$refs.dataForm.validate()
      return this.data
    }
  }

}
</script>
