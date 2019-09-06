<template>
  <el-row :gutter="10" v-if="searchs.length>0">
    <el-col v-for="(s) in searchs" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="s.label" >
      <template v-if="s.type&&(s.type.indexOf('jj-')==0 )" >
        <component :is="s.type" :data="buildData(s)"  />
      </template>
      <el-input v-else :placeholder="s.placeholder" v-model="s.value">
        <template slot="prepend">{{ s.label }}</template>
      </el-input>
    </el-col>


    <slot/>
  </el-row>
</template>
<style>
  .el-input-group__prepend {
    min-width: 100px;
    text-align: right;
  }
</style>
<script>

export default {
  name: `jj-search`,
  props: {
    searchs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted: function() {

  },
  methods: {
    // { field: 'search_eq_swarehouseid', label: '仓库', value: '', type: 'jj-warehouselist' }
    buildData(s){

        return s
    }
  }
}
</script>

