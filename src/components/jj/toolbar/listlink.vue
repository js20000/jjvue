<template>

  <div  class="jj_listlink">

    <div v-if="data.editIndex<0">
      <template  v-for="(btn,index) in data.column.data.buttons|| data.column.data">
        <jj-link
            v-if="!btn.state||btn.state=='normal'"
            :btn="btn"
            :key="index"
            :row="data.row"
            @click="trigger(btn)"/>
      </template>

      <el-dropdown style="line-height: 17px;top: 2px;" v-if="moreCount>0">
          <span class="el-dropdown-link" style="font-size:14px;font-weight: 500;">
            {{data.column.data.label?data.column.data.label:"更多操作"}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(btn,index) in data.column.data.list " :key="btn.event">
            <jj-link
                v-if="!btn.state||btn.state=='normal'"
                :key="btn.event+index+2000"
                :btn="btn"
                type="text"
                :row="data.row"
                @click="trigger(btn)"/>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div v-else-if="data.editIndex==data.index">
      <template   v-for="(btn,index) in data.column.data.buttons|| data.column.data ">
        <jj-link
            v-if="btn.state&&btn.state=='edit'"
            :key="index"
            :btn="btn"
            :row="data.row"
            @click="trigger(btn)"/>
      </template>
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
    name: `xx-listlink`,
    props: ['data'],
    mounted: function() {

    },
    computed: {
      moreCount() {
        if (!this.data.column.data.list) { return 0 }
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
        if (this.$store) {
          return this.$store.getters.has(this.$router.history.current.path + '#' + btn.event)
        }
      }

    }
  }
</script>

