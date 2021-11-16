<template>
  <el-row class="jj_toolbar_row">
    <el-col :span="12">
        <jj-button v-for="(btn) in data " :key="btn.event" :btn="btn" @click="trigger(btn)" />&nbsp;
        <slot/>
    </el-col>
    <el-col :span="12" >

      <div
v-if="searchType == 0"
          style=" text-align: right">
          <jj-button :btn="{label: '查询', icon: 'el-icon-search',plain:false,type:'blue'}" @click="refresh" />
          <jj-button :btn="{label: '重置', icon: 'el-icon-refresh',plain: false,type:'info'}" @click="reset" />
      </div>
      <div style="display:flex;" v-for="(s,index) in searchs" :key="index">
        <template v-if="searchType == 1 && searchs.length == 1 " >
          <template v-if="s.type&&(s.type.indexOf('jj-')==0 )"  >
            <component :is="s.type" :data="buildData(s)"  @onSearch="onSearch"   style="flex:1;">
            </component>
  <!--          <el-button style="float:right;display:inline-block;" icon="el-icon-refresh" @click="reset"  size="small"></el-button>-->
          </template>

          <el-input v-else :placeholder="s.placeholder" v-model="s.value"   clearable  @keydown.native="keyDown($event,s)"  >
            <template
                        v-if="s.label"
                       slot="prepend">{{ s.label }}</template>
            <el-button slot="append" icon="el-icon-search" @click="refresh" ></el-button>
          </el-input>
        </template>
      </div>
          <el-row class="flex"  justify="center" :gutter="10" v-if="searchType==1 && searchs.length>1" >
            <el-col v-for="(s) in searchs" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="s.label" >
              <template
                  v-if="s.type&&(s.type.indexOf('jj-')==0 )" >
                <component :is="s.type" :data="buildData(s)"  @onSearch="onSearch" />
              </template>
              <el-input
                  v-else
                  :placeholder="s.placeholder"
v-model="s.value"
clearable
@keydown.native="keyDown($event,s)"  >
                <template slot="prepend">{{ s.label }}</template>
              </el-input>
            </el-col>
            <el-col  :xs="24" :sm="12" :md="8" :lg="6" :xl="4" >
              <el-button icon="el-icon-search"  size="small" @click="refresh" ></el-button>
            </el-col>
          </el-row>
    </el-col>
  </el-row>
</template>
<style scoped>
  .jj_toolbar_row {
    margin-top:0px;
    :last-child {
      margin-bottom: 0;
    }
    .el-input-group {
       margin: 0 0!important;
    }

  }
</style>

<script>

export default {
  name: `jj-toolbar`,
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    searchs: {
      type: Array,
      default() {
        return []
      }
    },
    searchType: {
      type: Number,
      default() { return 0 }
    },
    selections: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted: function() {

  },
  methods: {
    trigger(btn) {
      if (btn.event) { this.$emit('event', { btn }) }
    },
    refresh() {
      this.$emit('resetPage')
      this.$emit('refresh')
    },
    reset() {
      this.$emit('resetPage')
      this.$emit('reset')
    },
    keyDown(event, data) {
      if (event.keyCode == 13) {
        this.onSearch(data)
      }
    },
    onSearch(data) {
      this.$emit('resetPage')
      this.$emit('onSearch', data)
    },
    buildData(s) {
      return s
    }

  }
}
</script>

