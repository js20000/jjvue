<template>
  <jj-form-item  data.column.field" :data="data">
      <el-input
        v-model="fieldValue"
      />
  </jj-form-item>
</template>
<style>

</style>
<script>
import formitem from '@/components/jj/forms/formitem'

export default {
  name: `jj-xinput`,
  props: ['data'],
  components: { 'jj-form-item': formitem },
  computed: {
    fieldValue: {
      get: function() {
        return this.$parent.getValue()
      },
      set: function(value) {
        this.$parent.setValue(value)
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

