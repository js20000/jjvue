<!--suppress ALL -->
<template>
  <el-link v-re-click  @click="on_click"  type="primary"  v-if="showFlag && hasP "  :disabled="disabled" style="padding-right: 5px;">{{ label }}</el-link>
<!--  <el-button type="text" :disabled="disabled"  plain size="small" @click="$emit('click')"  v-if="showFlag && hasP " style="padding-right: 5px;" >-->
<!--    {{ btn.label }}-->
<!--  </el-button>-->
</template>

<style>

</style>
<style>
  .ml50 {
    margin-left: 5px;
  }
</style>
<script>

  export default {
    props: {
      type: {
        Type: String,
        default: 'primary'
      },
      row: {
        Type: Object,
        default: null
      },
      btn: {
        Type: Object,
        default() {
          return {
            disabled: false
          }
        }
      }
    },
    data() {
      return {
        disabled: false
      }
    },
    mounted() {
      if (this.btn.needRow) {
        this.disabled = true
        this.$set(this.btn, 'disabled', true)
      } else { this.$set(this.btn, 'disabled', false) }
    },
    methods: {
      on_click() {
        if(event.target.reClick)
          return;
        this.$emit('click')
      }
    },
    computed: {
      label() {
        if (typeof this.btn.label === 'function') {
          return this.btn.label.apply(this, [{ row: this.row, btn: this.btn }])
        } else { return this.btn.label }
      },
      showFlag() {
        if (typeof this.btn.hidden === 'function') {
          return !this.btn.hidden.apply(this, [{ row: this.row, btn: this.btn }])
        } else { return !this.btn.hidden }
      },
      hasP() {
         if (!this.btn.permission) { return true }

        if (this.$store) { return this.$store.getters.has(this.btn.permission) }
      }
    },
    watch: {
      'btn.disabled'(v) {
        this.disabled = v
      }
    }
  }

</script>
