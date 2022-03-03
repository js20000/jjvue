<template>
  <div>
    <xx-form-item :data="data" v-if="data.index==data.editIndex && data.column.field" >
      <el-select v-model="fieldValue" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.val"
          :label="item.label"
          :value="item.val"/>
      </el-select>

    </xx-form-item>
    <div v-else v-html="formatValue">
    </div>
  </div>
</template>
<style>

</style>
<script>
  import formitem from '@/components/jj/forms/xx-form-item'
  export default {
    name: `jj-select`,
    components: { 'xx-form-item': formitem },
    props: ['data'],
    data() {
      return {
        list: []
      }
    },
    computed: {
      options() {
        const x = this.data.column.data
        if (typeof this.data.column.data == 'function') {
          return this.changeOptions(x.apply(this.$parent.vm, this.data))
        } else {
          return this.changeOptions(x)
        }
      },
      fieldValue: {
        get: function() {
          return this.$parent.getValue()
        },
        set: function(value) {
          this.$parent.setValue(value)
        }
      },
      formatValue() {
        return this.$parent.formatValue
      }
    },
    mounted: function() {

    },
    methods: {
      changeOptions(x) {
        return x.map(t => {
          if (Array.isArray(t)) {
            return { val: t[0], label: t[1] }
          } else {
            return t
          }
        })
      },
      rowValueChange() {
        this.$emit('rowValueChange', this.data)
      }

    }
  }
</script>

