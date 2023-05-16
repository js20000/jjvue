<!--suppress ALL -->
<template>
  <el-link
      :event="btn.event"
v-re-click
@click="on_click"
type="primary"
v-if="showFlag && hasP "
:disabled="disabled"
           style="padding-right: 5px;"
  >
    <span v-html="label" v-if="!!label"></span>
   <template v-else-if="btn.icon">
     <i v-if="btn.icon.indexOf(`el-icon`)==0" :class="btn.icon"/>
     <svg-icon v-else :icon-class="btn.icon"/>
   </template>
  </el-link>
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
        if (event.target.reClick) { return }
        if (this.$store && this.$store.getters.loading) { return }

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
         if (!this.btn.permission) {
           return true
         }
         if (this.$store) {
           const b = this.$store.getters.has(this.$router.history.current.path + '#' + this.btn.event)
           if (!b) { this.$store.dispatch('JJ_BUTTON_CHECK', this.btn) }
           return b
         }
         return false
      }
    },
    watch: {
      'btn.disabled'(v) {
        this.disabled = v
      }
    }
  }

</script>
