<!--suppress ALL -->
<template>

  <el-form ref="dataForm" :model="obj" label-width="80px" size="large">
    <el-form-item label="格式">
      <el-input v-model="obj.sfromat" placeholer="yymmdd0000"/>
    </el-form-item>

    <el-form-item  label="large" >
      <xlist :url="list" dis-field="name" val-field="id" default-val="" size="large"/>
    </el-form-item>
    <el-form-item  label="medium" >
      <xlist :url="list" dis-field="name" val-field="id" default-val="" size="medium" :disabled="true" />
    </el-form-item>
    <el-form-item  label="small" >
      <xlist :url="list" dis-field="name" val-field="id" default-val="" size="small"/>
    </el-form-item>
    <el-form-item  label="mini" >
      <xlist :url="list" dis-field="name" val-field="id" default-val="" size="mini"/>
    </el-form-item>

    <el-form-item label="后缀" >
      <xselect v-model="xselect" :force="true" :data="list" val-field="id" dis-field="name" placeholder="请选择" @select="select"/>
    </el-form-item>
    <el-form-item label="其它" >
      <xselect v-model="xselect" :force="true" :url="" val-field="id" dis-field="name" placeholder="请选择" @select="select"/>
    </el-form-item>
    <jj-button @click="testClick" :btn="{label:'test'}" >

    </jj-button>
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
        i: 0,
        list: [
            { id: 1, name: '选择一' },
            { id: 2, name: '选择二' },
            { id: 3, name: '选择三' },
            { id: 4, name: '选择四', disabled: true },
            { id: 5, name: '选择五' }
        ],
        xselect: ''
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
    testClick() {
      this.$message('clicked:' + this.i++)
      this.list.push({ id: this.i++, name: '选择' + this.i++ })
    },
    async validate() {
      await this.$refs.dataForm.validate()
      return this.data
    },
      select: function(item) {
          console.log(item)
      }
  }

}
</script>
