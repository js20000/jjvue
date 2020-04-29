<template>
  <jj-form-item :data="data" >
      <el-input
        v-model="fieldValue"
      />
  </jj-form-item>
</template>
<style>

</style>
<script>

export default {
  name: `jj-xinput`,
  props: ['data'],
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

