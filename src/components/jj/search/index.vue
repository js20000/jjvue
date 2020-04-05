<template>
  <el-row :gutter="10" v-if="searchType==0 && searchs.length>0">
    <el-col v-for="(s) in searchs" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="s.label" >
      <template v-if="s.type&&(s.type.indexOf('jj-')==0 )" >
        <component :is="s.type" :data="buildData(s)"  @onSearch="onSearch" />
      </template>
      <el-input v-else :placeholder="s.placeholder" v-model="s.value"  @keydown.native="keyDown($event,s)" >
        <template slot="prepend">{{ s.label }}</template>
      </el-input>
    </el-col>
    <slot/>
  </el-row>
</template>
<style type="scoped">
  .el-input-group__prepend {
    min-width: 100px;
    text-align: right;
  }
  .el-select{
    width:100%;
  }
</style>
<script>

export default {
  name: `jj-search`,
  props: {
    searchType: {
      type: Number,
      default() { return 0 }
    },
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
    keyDown(event, data) {
      if (event.keyCode == 13) {
        this.onSearch(data)
      }
    },

    onSearch(data) {
      this.$emit('onSearch', data)
    },
    buildData(s) {
        return s
    }
  }
}
</script>

