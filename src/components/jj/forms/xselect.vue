<!--suppress ALL -->
<template>

  <el-select
v-model="bindfield"
               :value-key="valField"
               clearable
               filterable
               :size="size"
               :disabled="disabled"
               :remote="remote"
               :remote-method="remoteMethod"
               :placeholder="placeholder"
               loading-text="数据加载中"
               :loading="loading"
               @change="onselect"
               @clear="onclear"
      >
      <el-option
        v-for="item in list"
        :key="item[valField]"
        :label="item[disField]"
        :disabled="typeof item.disabled != 'undefined' ? item.disabled : false"
        :value="item[valField]"/>
    </el-select>

</template>

<script>
    export default {
        name: 'XSelect',
        components: {},
        props: {
            value: {},
            label: { type: String, default: '' },
            placeholder: { type: String, default: '' },
            valField: { type: String, default: '' },
            disField: { type: String, default: '' },
            url: { type: String, default: '' },
            data: {
                type: Array, default() {
                    return []
                }
            },
            defaultVal: {},
            disabled: { type: Boolean, default: false },
            force: { type: Boolean, default: false },
            param: { type: Object, default() {
                return {}
                } },
            remote: { type: Boolean, default: false },
            remoteMethod: { type: Function, default: function() {} },
            size: { type: String, default: 'small' }
        },
        data: function() {
            return {
                loading: false,
                bindfield: (this.value == null || typeof this.value == 'undefined') ? '' : this.value,
                list: (this.data == null || typeof this.data == 'undefined') ? [] : this.data
            }
        },
        mounted() {
            this.initSelect()
        },
        watch: {
          value(val) {
                this.bindfield = val
                if ((this.bindfield == null || this.bindfield == '') &&
                  this.force === true
                ) {
                  if (this.list.length > 0) { this.bindfield = this.list[0][this.valField] } else { this.bindfield = '' }
                }
            },
            bindfield(val) {
                this.$emit('input', val)
                this.$emit('change', this.getItem())
            }
        },
        methods: {
            initSelect: async function() {
                if (this.url != null && this.url != '') {
                    this.loading = true
                    const rs = await this.$get(this.url, this.param)
                    if (rs.data && rs.data.content) {
                        this.list = rs.data.content
                    } else {
                        this.list = rs.data
                    }
                    this.loading = false
                    this.$emit('ondata', rs.data)
                }
                if ((this.bindfield == null || this.bindfield == '') &&
                    this.force === true
                ) {
                    if (this.list.length > 0) { this.bindfield = this.list[0][this.valField] } else { this.bindfield = '' }
                }
            },
            onselect() {
                this.$emit('change', this.getItem())
            },
            onclear() {
                this.$emit('clear')
            },
            getItem: function() {
                const item = this.list.filter(obj => obj[this.valField] === this.bindfield)
                if (item.length > 0) {
                    return item[0]
                }
            }

        }

    }

</script>
