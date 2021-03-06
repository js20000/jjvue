<template>
  <el-form-item v-if="data.column.field" :prop="data.column.field" :rules="rules" style="margin-bottom: 0;">
    <el-tooltip class="item" effect="dark" v-model="tooltips.show" :content="tooltips.tips" placement="top-start" :manual="true">
      <slot />
    </el-tooltip>
  </el-form-item>
</template>
<style>

</style>
<script>

  export default {
    name: `jj-formitem`,
    props: ['data'],
    data() {
      return { tooltips: { show: false, tips: '' }}
    },
    computed: {
      rules() {
        if (typeof this.data.column.rules == 'function') {
          return [{ validator: this.validator, _validator: this.data.column.rules, value: this.$parent.fieldValue, tooltips: this.tooltips }]
        }
        if (this.data.column.rules) {
          return this.data.column.rules.map(x => {
            return { trigger: x.trigger, message: x.message, _pattern: x.pattern, validator: this.validator, _validator: this.getValidator(x), value: this.$parent.fieldValue, tooltips: this.tooltips }
          })
        } else { return [] }
      }
    },
    methods: {
      getValidator(x) {
        if (x.validator) { return x }
        if (x.required) {
          return this.requiredValidate
        }
        if (x.pattern) {
          return this.patternValidate
        }
      },
      requiredValidate(r, v, b) {
        if (v == null || typeof v == 'undefined' || v === '') {
          b('这是必填字段')
        } else { b() }
      },
      patternValidate(r, v, b) {
          if (!!v && !r._pattern.test(v)) {
            b('格式不正确!')
          } else { b() }
      },
      validator(r, v, callback) {
        v = r.value
        r._validator(r, v, function(obj) {
          if (obj) {
            r.tooltips.show = true
            r.tooltips.tips = r.message ? r.message : obj
            callback(obj)
          } else {
            r.tooltips.show = false
            callback()
          }
        })
      }

    }
  }
</script>

