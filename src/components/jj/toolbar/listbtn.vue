<template>

  <div class="jj_listbtn">
    <el-button-group v-if="data.editIndex==data.index">
      <template   v-for="(btn,index) in data.column.data.buttons|| data.column.data">
      <jj-button
                v-if="btn.state&&btn.state=='edit'"
                :key="btn.event+index"
                 :btn="btn"
                  :row="data.row"
                 @click="trigger(btn)"/>
      </template>
    </el-button-group>
    <div v-if="data.editIndex<0">
      <el-button-group>
        <template   v-for="(btn,index) in data.column.data.buttons|| data.column.data">
        <jj-button
                v-if="!btn.state||btn.state=='normal'"
                :key="btn.event+index"
                 :btn="btn"
                :row="data.row"
                   @click="trigger(btn)"/>
        </template>
      </el-button-group>
      <el-dropdown style="padding-left: 20px">
        <span class="el-dropdown-link">更多操作<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(btn) in data.column.data.list||[] " :key="btn.event">
                  <jj-button
                      v-if="!btn.state||btn.state=='normal'"
                      :key="btn.event"
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
.jj_listbtn .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

.jj_listbtn  .el-icon-arrow-down {
    font-size: 12px;
  }

.jj_listbtn .el-row {
    margin-bottom: 10px;
    :last-child {
      margin-bottom: 0;
    }
  }

.jj_listbtn  .el-button-group .el-button--primary:nth-last-child(1):first-child {
    border-left-color: #b3d8ff;
    border-right-color: #b3d8ff;
  }

</style>
<script>

    export default {
        name: `jj-listbtn`,
        props: ['data'],
        mounted: function() {

        },
        methods: {
            trigger(btn) {
                if (btn.event) {
                    this.$emit('event', { row: this.data.row, index: this.data.index, btn })
                }
            }

        }
    }
</script>

