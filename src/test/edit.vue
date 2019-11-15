<!--suppress ALL -->
<template>
  <el-form ref="dataForm" :model="obj" label-width="80px" >
    <el-form-item :rules="[rules.r]" label="对象名" prop="sobjectname">
      <el-input v-model="obj.sobjectname" />
    </el-form-item>
    <el-form-item :rules="[rules.r,rules.enname]" label="表名" prop="scode" >
      <el-input v-model="obj.scode" />
    </el-form-item>
    <el-form-item label="格式">
      <el-input v-model="obj.sfromat" placeholer="yymmdd0000"/>
    </el-form-item>

    <el-form-item :rules="[rules.r,rules.i]" label="增长阶梯" prop="iincrement">
      <el-input v-model="obj.iincrement" />
    </el-form-item>
    <el-form-item :rules="[rules.r,rules.i]" label="当前序号" prop="icurrentno">
      <el-input v-model="obj.icurrentno" />
    </el-form-item>
    <el-form-item :rules="[rules.enname]" prop="sprefix" label="前缀">
      <el-input v-model="obj.sprefix" />
    </el-form-item>
    <el-form-item :rules="[rules.enname]" label="后缀" prop="ssuffix">
      <el-input v-model="obj.ssuffix" />
    </el-form-item>
    <el-form-item :rules="[rules.enname]" label="后缀" prop="ssuffix">
      <xlist :url="list" dis-field="name" val-field="id"/>
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
            {id:4,name:'选择四'},
            {id:5,name:'选择五'}
        ]
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
