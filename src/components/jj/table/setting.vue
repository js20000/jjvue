<template>
  <el-dialog
      v-if="settingFlag"
      title="设置"
      :append-to-body="true"
      :visible.sync="settingFlag"
      width="800px"
      height="100%"
  >
    <sort-transfer    v-if="settingFlag" v-model="result" :inputList="columns" :alias="{key: 'label',label: 'label'}"></sort-transfer>
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
    columns() {
       const rs = []
       for (let i = 0; i < this.data.length; i++) {
          const col = this.data[i]
          rs.push({ label: col.label, key: col.label, width: col.width })
       }
       return rs
    }
  },
  mounted() {
    this.settingFlag = this.value
    const rs = JSON.parse(localStorage.getItem(this.id) || '[]')
    for (const x of rs) {
      if (x && x.label) {
        this.result.push(x.label)
      }
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
      this.$emit('reset-col', [...this.result])
    }
  }
}
</script>
