<template>
  <el-form-item v-if="data.field||data.column.field" :prop="data.field||data.column.field" :rules="rules" style="margin-bottom: 0;" v-bind="$attrs">
    <el-tooltip class="item" :disabled="!tooltips.show" effect="dark" :content="tooltips.tips" placement="top-start" v-if="rules.length>0">
      <slot />
    </el-tooltip>
    <template v-else>
      <slot />
    </template>

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
        const _rules = this.data.column.rules || this.data.rules
        if (typeof _rules == 'function') {
          return [{ row: this.data.row, validator: this.validator, _validator: _rules, tooltips: this.tooltips, trigger: 'blur' }]
        }

        if (_rules) {
          return _rules.map(x => {
            return { ...x, _field: this.data.column.field, row: this.data.row, _pattern: x.pattern, validator: this.validator, _validator: this.getValidator(x), tooltips: this.tooltips }
          })
        } else { return [] }
      }
    },
    methods: {
      getValidator(x) {
        if (x.validator) { return x.validator }
        if (x.required) {
          return this.requiredValidate
        }
        if (x.pattern) {
          return this.patternValidate
        }
        return this.notExistValidate
      },
      notExistValidate(r, v, b) {
        console.log('字段验证器定制错误', r)
        b('字段验证器定制错误,请查看控制台')
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
        v = this.getFieldValue(r.row, r._field)
        r._validator(r, v, function(obj) {
          if (obj instanceof Error) {
            obj = obj.message
          }
          if (obj) {
            r.tooltips.tips = r.message ? r.message : obj
            r.tooltips.show = !!r.tooltips.tips
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

