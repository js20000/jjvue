<template>
  <el-form size="small">
    <el-form-item label-width="0" style="margin: 0 0;">
    <el-row :gutter="10" v-if="searchType==0 && searchs.length>0" :class="screenWidth <1920 ? 'row-con':''">
      <jj-button :btn="{label: '更多筛选', icon: 'el-icon-s-operation',plain:false,type:'blue'}" class="sermore" v-if="screenWidth <1920 && searchs.length > 4" @click="drawer = true" />
      <el-col v-for="(s) in searchs" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="s.label" >
        <template v-if="s.type" >
          <component :is="s.type" :data="s"   @onSearch="onSearch"  />
        </template>
        <el-input v-else :placeholder="s.placeholder" v-model="s.value"  @keydown.native="keyDown($event,s)" >
          <template slot="prepend">{{ s.label }}</template>
        </el-input>
      </el-col>
      <slot/>
    </el-row>
    <el-drawer
      title="更多筛选"
      class="mydrawer"
      :visible.sync="drawer"
      :with-header="false">
      <el-row :gutter="10" v-if="searchType==0 && searchs.length>0" class="drawer-con">
        <el-col v-for="(s) in searchs" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :key="s.label" >
          <template v-if="s.type" >
            <component :is="s.type" :data="s"   @onSearch="onSearch"  />
          </template>
          <el-input v-else :placeholder="s.placeholder" v-model="s.value"  @keydown.native="keyDown($event,s)" >
            <template slot="prepend">{{ s.label }}</template>
          </el-input>
        </el-col>
        <slot/>
      </el-row>
      <div class="mydrawer-footer" v-if="searchType == 0">
        <jj-button :btn="{label: '查询', icon: 'el-icon-search',plain:false,type:'blue'}" @click="refresh" />
        <jj-button :btn="{label: '重置', icon: 'el-icon-refresh',plain: false,type:'info'}" @click="reset" />
      </div>
    </el-drawer>
    </el-form-item>
  </el-form>
</template>
<style type="scoped">
  .el-input-group__prepend {
    min-width: 100px;
    text-align: right;
  }
  .el-select{
    width:100%;
  }
  .row-con{
    padding-right: 140px;
    position: relative;
    height: 44px;
    overflow: hidden;
  }
  .sermore{
    position:absolute;
    right: 8px;
    top:6px
  }
  .drawer-con{
    padding: 0 30px;
  }
  .mydrawer .el-drawer__header{
    padding: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
    background: #f5f6f9;
    color: #333;
  }
  .mydrawer .el-input-group__prepend{
    text-align: justify;
    text-align-last: justify;
  }
  .mydrawer-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
    padding: 20px;
    border-bottom: 1px solid rgb(230, 230, 230);
    background: #f5f6f9;
    text-align: right;
  }

</style>
<script>

export default {
  name: `jj-search`,
  props: {
    vm: {
      type: Object
    },
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
  data() {
    return {
      drawer: false,
      screenWidth: document.body.clientWidth
    }
  },
  mounted: function() {
      for (const item of this.searchs) {
        item.vm = this.vm
      }
  },
  methods: {
    trigger(btn) {
      if (btn.event) { this.$emit('event', { btn }) }
    },
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
    },
    refresh() {
      this.$emit('resetPage')
      this.$emit('refresh')
    },
    reset() {
      this.$emit('resetPage')
      this.$emit('reset')
    }
  }
}
</script>

