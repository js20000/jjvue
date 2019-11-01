<template>
  <div v-if="data.column.data  instanceof Array">
    <el-button-group v-if="data.editIndex==data.index">
      <jj-button v-for="(btn) in data.column.data " v-if="btn.state&&btn.state=='edit'" :key="btn.event" :btn="btn" :row="data.row"
                 @click="trigger(btn)"/>
    </el-button-group>
    <div  v-else-if="data.editIndex<0">
      <el-button-group>
        <jj-button v-for="(btn) in data.column.data " v-if="!btn.state||btn.state=='normal'" :key="btn.event" :btn="btn" :row="data.row"
                   @click="trigger(btn)"/>
      </el-button-group>

    </div>
  </div>
  <div v-else>
    <el-button-group v-if="data.editIndex==data.index">
      <jj-button v-for="(btn) in data.column.data.buttons " v-if="btn.state&&btn.state=='edit'" :key="btn.event" :btn="btn" :row="data.row"
                 @click="trigger(btn)"/>
    </el-button-group>
    <div  v-else-if="data.editIndex<0">
      <el-button-group>
        <jj-button v-for="(btn) in data.column.data.buttons " v-if="!btn.state||btn.state=='normal'" :key="btn.event" :btn="btn"  :row="data.row"
                   @click="trigger(btn)"/>
      </el-button-group>
      <el-dropdown style="padding-left: 20px" >
        <span class="el-dropdown-link">更多操作<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu v-if="data.editIndex==data.index">
          <el-dropdown-item   v-for="(btn) in data.column.data.list ">
            <jj-button v-if="btn.state&&btn.state=='edit'" :key="btn.event" :btn="btn" type="text" :row="data.row"
                       @click="trigger(btn)"/>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-else-if="data.editIndex<0">
          <el-dropdown-item  v-for="(btn) in data.column.data.list " :key="btn.event">
            <jj-button  v-if="!btn.state||btn.state=='normal'" :key="btn.event" :btn="btn" type="text" :row="data.row"
                        @click="trigger(btn)"/>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </div>



</template>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-row {
    margin-bottom: 10px;

  :last-child {
    margin-bottom: 0;
  }

  }
</style>
<script>

  export default {
    name: `jj-listbtn`,
    props: ['data'],
    mounted: function () {

    },
    methods: {
      trigger(btn) {
        if (btn.event) {
          this.$emit('event', {row: this.data.row, index: this.data.index, btn})
        }
      }

    }
  }
</script>

