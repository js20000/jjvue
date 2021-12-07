<template>
  <el-dialog
      v-if="settingFlag"
      title="设置"
      :modal="true"
      :append-to-body="true"
      :visible.sync="settingFlag"
      @close="$emit('input',false)"
      width="600px"
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
  props: ['value', 'columns', 'result'],
  components: { SortTransfer },

  data() {
    return {
      settingFlag: false
    }
  },
  computed: {

  },
  mounted() {
    this.settingFlag = this.value
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
