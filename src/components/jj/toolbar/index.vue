<template>
  <el-row>
    <el-col :span="12">
      <el-button-group>
        <jj-button v-for="(btn) in data " :key="btn.event" :btn="btn" @click="trigger(btn)" />
      </el-button-group>
      <slot/>
    </el-col>
    <el-col :span="12">

      <div style="text-align: right" v-if="searchType == 0">
        <el-button-group>
          <jj-button :btn="{label: '查询', icon: 'el-icon-search'}" @click="refresh" />
          <jj-button :btn="{label: '重置', icon: 'el-icon-refresh'}" @click="reset" />
        </el-button-group>
      </div>
      <div style="text-align: right" v-if="searchType == 1 && searchs.length == 1 " v-for="(s) in searchs">
        <template v-if="s.type&&(s.type.indexOf('jj-')==0 )" >
          <el-button slot="append" icon="el-icon-search" @click="refresh" style="float:right;" size="small"></el-button>
          <component :is="s.type" :data="buildData(s)"  @onSearch="onSearch"  style="float:right;">
          </component>
        </template>
        <el-input v-else :placeholder="s.placeholder" v-model="s.value"  clearable="true" @keydown.native="keyDown($event,s)">
          <template  v-if="s.label" slot="prepend">{{ s.label }}</template>
          <el-button slot="append" icon="el-icon-search" @click="refresh" ></el-button>
        </el-input>
      </div>
        <div style="text-align: right" v-if="searchType == 1 && searchs.length > 1">

        </div>
    </el-col>
  </el-row>
</template>
<style>
  .el-row {
    margin-bottom: 10px;
  :last-child {
    margin-bottom: 0;
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
      this.$emit('refresh')
    },
    reset() {
      this.$emit('reset')
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
    }

  }
}
</script>

