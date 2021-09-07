<template>
  <div  class="jj_listlink"  v-if="data.column.data  instanceof Array">
    <div v-if="data.editIndex==data.index">
      <jj-link
        v-for="(btn,index) in data.column.data "
        v-if="btn.state&&btn.state=='edit'"
        :key="index"
        :btn="btn"
        :row="data.row"
        @click="trigger(btn)"/>
    </div>
    <div v-else-if="data.editIndex<0">
        <jj-link
          v-for="(btn) in data.column.data "
          v-if="!btn.state||btn.state=='normal'"
          :key="btn.event"
          :btn="btn"
          :row="data.row"
          @click="trigger(btn)"/>
    </div>
  </div>
  <div  class="jj_listlink"  v-else>
    <div v-if="data.editIndex==data.index">
      <jj-link
        v-for="(btn,index) in data.column.data.buttons "
        v-if="btn.state&&btn.state=='edit'"
        :key="btn.event+index"
        :btn="btn"
        :row="data.row"
        @click="trigger(btn)"/>
    </div>
    <div v-else-if="data.editIndex<0">
        <jj-link
          v-for="(btn) in data.column.data.buttons "
          v-if="!btn.state||btn.state=='normal'"
          :key="btn.event+index"
          :btn="btn"
          :row="data.row"
          @click="trigger(btn)"/>
      <el-dropdown style="line-height: 17px;top: 2px;" v-if="moreCount>0">
        <span class="el-dropdown-link" style="font-size:14px;font-weight: 500;">
          {{data.column.data.label?data.column.data.label:"更多操作"}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu v-if="data.editIndex==data.index">
          <el-dropdown-item v-for="(btn,index) in data.column.data.list " :key="btn.event">
            <jj-link
              v-if="btn.state&&btn.state=='edit'"
              :key="btn.event+index"
              :btn="btn"
              type="text"
              :row="data.row"
              @click="trigger(btn)"/>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-else-if="data.editIndex<0">
          <el-dropdown-item v-for="(btn,index) in data.column.data.list " :key="btn.event">
            <jj-link
              v-if="!btn.state||btn.state=='normal'"
              :key="btn.event+index"
              :btn="btn"
              type="text"
              :row="data.row"
              @click="trigger(btn)"/>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </div>

</template>
<style scoped>
.jj_listlink .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

.jj_listlink   .el-icon-arrow-down {
    font-size: 12px;
  }

.jj_listlink  .el-row {
    margin-bottom: 10px;

.jj_listlink  :last-child {
    margin-bottom: 0;
  }

  }

.jj_listlink   .el-button-group .el-button--primary:nth-last-child(1):first-child {
    border-left-color: #b3d8ff;
    border-right-color: #b3d8ff;
  }

</style>
<script>

  export default {
    name: `jj-listlink`,
    props: ['data'],
    mounted: function() {

    },
    computed: {
      moreCount() {
        for (const btn of this.data.column.data.list) {
           if (this.showFlag(btn) && this.hasP(btn)) { return 1 }
        }
        return 0
      }
    },
    methods: {
      trigger(btn) {
        if (btn.event) {
          this.$emit('event', { row: this.data.row, index: this.data.index, btn })
        }
      },
      showFlag(btn) {
        if (typeof btn.hidden === 'function') {
          return !btn.hidden.apply(this, [{ row: this.data.row, btn: btn }])
        } else { return !btn.hidden }
      },
      hasP(btn) {
        if (!btn.permission) { return true }
        if (this.$store) { return this.$store.getters.has(btn.permission) }
      }

    }
  }
</script>

