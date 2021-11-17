<template>
  <el-dialog
      v-if="settingFlag"
      title="设置"
      :modal="true"
      :append-to-body="true"
      :visible.sync="settingFlag"
      @close="$emit('input',false)"
      width="400px"
      height="100%"
  >
    <div style="max-height: 600px;overflow: auto;">
    <sort-transfer   ref="sortTransfer"  v-if="settingFlag" v-model="result" :inputList="columns" :alias="{key: 'label',label: 'label'}"></sort-transfer>
    </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('input',false)">取 消</el-button>
            <el-button @click="resetAll">重置</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>

  </el-dialog>
</template>

<script>
import SortTransfer from './sortTransfer'

export default {
  props: ['id', 'data', 'value'],
  components: { SortTransfer },

  data() {
    return {
      settingFlag: false,
      result: []
    }
  },
  computed: {
    columns() { // 排序显示
       const map = {}
       const rs = []
       for (let i = 0; i < this.data.length; i++) {
          const col = this.data[i]
          map[col.label] = col
       }
        for (const x of this.result) {
           const col = map[x.label]
          if (col) {
            rs.push({ label: col.label, width: col.width })
            map[x.label] = null
          }
        }
      for (let i = 0; i < this.data.length; i++) {
        const col = this.data[i]
        if (map[col.label]) {
          rs.push({ label: col.label, width: col.width })
        }
      }
        return rs
    }
  },
  mounted() {
    this.settingFlag = this.value
    const rs = JSON.parse(localStorage.getItem(this.id) || '[]')
    for (const x of rs) {
        this.result.push(x)
    }
  },
  methods: {
    resetAll() {
      this.settingFlag = false
      this.$emit('input', this.settingFlag)
      this.$emit('reset-col', [])
    },
    ok() {
      this.settingFlag = false
      this.$emit('input', this.settingFlag)
      const rs = this.$refs.sortTransfer.getResult()
      this.$emit('reset-col', rs)
    }
  }
}
</script>
