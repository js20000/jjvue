<!--suppress ALL -->
<template>

    <el-select v-model="field"
               :value-key="valField"
               clearable
               filterable
               :size="size"
               :disabled="disabled"
               :remote="remote"
               :remote-method="remoteMethod"
               :placeholder="placeholder"
               @change="onselect"
               @clear="onclear"
      >
      <el-option
        v-for="item in list"
        :key="item[valField]"
        :label="item[disField]"
        :value="item[valField]"/>
    </el-select>

</template>



<script>
    export default {
        name: "XSelect",
        components: {},
        props: {
            placeholder: {type: String, default: ""},
            valField: {type: String, default: ""},
            disField: {type: String, default: ""},
            url: {type: String, default: ""},
            data: {
                type: Array, default() {
                    return []
                }
            },
            defaultVal:{},
            disabled: {type: Boolean, default: false},
            force: {type: Boolean, default: false},
            param: {type: Object, default(){
                return {}
                }},
            remote: {type: Boolean, default: false},
            remoteMethod: {type: Function, default: function () {}},
            size: {type: String, default: "small"}
        },
        data: function () {
            return {
                field: '',
                list: (this.data == null || typeof this.data == "undefined") ? [] : this.data
            }
        },
        model:{
          prop:'field',
            event:'change'
        },
        mounted() {
            this.initSelect()
        },
        methods: {
            initSelect: async function () {
                if(this.url != null && this.url != ''){
                    const rs = await this.$post(this.url, this.param)
                    if (rs.data && rs.data.content) {
                        this.list = rs.data.content
                    } else {
                        this.list = rs.data
                    }
                    this.$emit('ondata', rs.data)
                }
                console.log(this.field == '')
                console.log(this.force === true)
                if(this.field == ''
                    && this.list.length > 0
                    && this.force === true
                ){
                    this.field = this.list[0][this.valField]
                    this.onselect()
                }
            },
            onselect() {
                this.$emit("change", this.field)
            },
            onclear() {
                this.$emit("change", this.field)
            }

        }

    }

</script>
