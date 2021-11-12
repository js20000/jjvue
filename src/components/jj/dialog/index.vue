<!--suppress ALL -->
<template>
  <el-dialog
      v-if="showflag"
      :visible.sync="showflag"
v-bind="$attrs"
             :append-to-body="append_to_body"
             :modal-append-to-body="modal_append_to_body"
             :modal="modal"
             :close-on-click-modal="false"
:title="data.title"
:width="data.width"
:fullscreen="data.fullscreen"
@close="close"
  >
    <slot />

    <div v-if="data.btns && data.btns.length===0" slot="footer" class="dialog-footer">
      <jj-button
        :btn="{
          label: '取 消', icon: 'cancel', event: 'ok'
        }"
        @click="close">取 消</jj-button>
      <jj-button
        :btn="{
          label: '保存', icon: 'ok', event: 'ok'
        }"
        @click="ok" />
    </div>
    <div v-else-if="data.btns && data.btns.length > 0" slot="footer" class="dialog-footer" >
      <jj-button v-for="btn in data.btns" :key="btn.event" :btn="btn" @click="trigger(btn)"/>
    </div>
    <div v-if="data.icon" slot="title" class="el-dialog__title">
      <i v-if="data.icon.indexOf(`el-icon`)==0" :class="data.icon"/>
      <svg-icon v-else :icon-class="data.icon"/>
      {{ data.title }}
    </div>
  </el-dialog>

</template>
<style>

</style>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return {
          data: {
            icon: '',
            title: '',
            btns: []
          }
        }
      }
    }
  },
  data() {
    return {
      showflag: false
    }
  },
  computed: {
      append_to_body() {
        return this.data.append_to_body ? this.data.append_to_body : false
      },
      modal_append_to_body() {
        return this.data.modal_append_to_body ? this.data.modal_append_to_body : false
      },
      modal() {
        return this.data.modal ? this.data.modal : true
      }
  },
  mounted() {

  },
  methods: {
    show() {
      this.showflag = true
    },
    close() {
      this.showflag = false
      this.$emit('close')
    },
    ok() {
      this.$emit('ok')
    },
    trigger(btn) {
      if (btn.event) {
        if (btn.event == 'cancel') { this.close() }
        this.$emit(btn.event)
      }
    }
  }

}
</script>
