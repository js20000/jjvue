<template>
  <div>
    <jj-form-item v-if="data.index==data.editIndex && data.column.field" :data="data">
      <el-switch
        @change="rowValueChange"
        v-model="fieldValue"
        :active-value="active[0]"
        :inactive-value="inactive[0]"
        :active-text="active[1]"
        :inactive-text="inactive[1]"
      />

    </jj-form-item>

    <template v-else>
      <el-switch
        @change="rowValueChange"
        v-model="fieldValue"
        :disabled="xdisabled"
        :active-value="active[0]"
        :inactive-value="inactive[0]"
        :active-text="active[1]"
        :inactive-text="inactive[1]"/>
    </template>
  </div>
</template>
<style>

</style>
<script>
  import formitem from '@/components/jj/forms/formitem'

export default {
  name: `jj-checkbox`,
  props: ['data'],
  components: { 'jj-form-item': formitem },
  computed: {
    xdisabled() {
       if (typeof this.data.column.disabled == 'undefined') { return true }
        return !!this.data.column.disabled
    },
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
      }
    },
    active() {
      const data = this.data.column.data
      if (data) {
        return data[0][0] ? data[0] : data[1]
      } else {
        return [1, '']
      }
    },
    inactive() {
      const data = this.data.column.data
      if (data) {
        return data[0][0] ? data[1] : data[0]
      } else {
        return [0, '']
      }
    }
  },
  mounted: function() {

  },
  methods: {
    rowValueChange() {
      this.$emit('rowValueChange', this.data)
    }

  }
}
</script>

