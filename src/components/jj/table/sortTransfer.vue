<template>
  <div>
        <el-table
            ref="table"
            :data="inputList"
            @selection-change="selectChange"
            >

          <el-table-column type="index" width="40"></el-table-column>
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="列名" width="180" prop="label"></el-table-column>
<!--          <el-table-column label="自定义名称" width="150" >-->
<!--            <template slot-scope="scope">-->
<!--             <el-input class="jj-xinput-right" v-model="scope.row.alias"></el-input>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="宽度" min-width="80">-->
<!--            <template slot-scope="scope">-->
<!--              {{scope.row.width}}-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="排序" min-width="180">
            <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-arrow-up" circle  @click="upData(scope.$index)"></el-button>
                  <el-button size="mini" icon="el-icon-arrow-down" circle  @click="downData(scope.$index)"></el-button>
            </template>
          </el-table-column>

        </el-table>

  </div>
</template>

<script>
import {
  Message,
  Notification
} from 'element-ui'
export default {
  name: 'MyTransfer',
  props: [
    'value',
    'inputList',
    'alias'
  ],
  data() {
    return {
      upDownDisable: true,
      tempSelectionKeys: [],
      outputListTemp: []
    }
  },
  watch: {

  },
  mounted() {
    this.outputListTemp = [...this.value]
    const map = {}
    for (let i = 0; i < this.inputList.length; i++) {
      const obj = this.inputList[i]
      map[obj.label] = obj
    }
    if (this.outputListTemp.length == 0) {
      this.$refs.table.toggleAllSelection()
    }
    for (const i of this.outputListTemp) {
        const tmp = map[i.label]
        if (tmp) { this.$refs.table.toggleRowSelection(tmp, true) }
    }
  },
  methods: {
    getResult() {
      const rs = []
      for (let i = 0; i < this.inputList.length; i++) {
          const x = this.inputList[i]
          if (this.tempSelectionKeys.indexOf(x) >= 0) {
            rs.push({ label: x.label, alias: x.alias, width: x.width })
          }
      }
      return rs
    },
    filterMethod(query, item) {
      return true
    },
    selectChange(selection) {
      this.tempSelectionKeys = [...selection]
    },
    upData(indexNum) {
      if (indexNum > 0) {
        this.inputList.splice(indexNum - 1, 0, this.inputList[indexNum])
        this.inputList.splice(indexNum + 1, 1)
      }
    },
    downData(indexNum) {
      if (indexNum > -1 && indexNum != this.outputListTemp.length - 1) {
        this.inputList.splice(indexNum + 2, 0, this.inputList[indexNum])
        this.inputList.splice(indexNum, 1)
      }
    }
  }
}
</script>
<style type="text/css">
</style>
