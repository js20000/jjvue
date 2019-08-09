<template>
  <el-row>
    <el-col :span="12">
      <el-button-group>
        <jj-button v-for="(btn) in data " :key="btn.event" :btn="btn" @click="trigger(btn)" />
      </el-button-group>
      <slot/>
    </el-col>
    <el-col :span="12">
      <div style="text-align: right">
        <el-button-group>
          <jj-button :btn="{label: '查询', icon: 'el-icon-search'}" @click="refresh" />
          <jj-button :btn="{label: '重置', icon: 'el-icon-refresh'}" @click="reset" />
        </el-button-group>
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
    }

  }
}
</script>

