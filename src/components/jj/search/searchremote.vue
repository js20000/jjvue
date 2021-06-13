<!--suppress ALL -->
<template>
  <div  class="el-input el-input-group el-input--medium el-input-group--prepend el-input--suffix">
    <div class="el-input-group__prepend"  v-if="data.label">{{data.label}}</div>
    <div>
  <xremote
    :multiple="data.data.multiple?true:false"
    v-model="data.value"
    :label="data.label"
    :size="data.data.size?data.data.size:'small'"
    :data="data.data.list"
    :url="data.data.url"
    :val-field="data.data.valField"
    :dis-field="data.data.disField"
    :params="data.data.params"
    :placeholder="data.placeholder?data.placeholder:data.label"
    @change="onselect"
    @clear="onselect"
    style="width: 100%;"

  />
    </div>
    </div>

</template>

<script>
    export default {
        name: 'SearchSelect',
        components: {},
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        data: {}
                    }
                }
            }
        },
        data() {
            return {
                list: (this.data.data.list == null || typeof this.data.data.list == 'undefined') ? [] : this.data.data.list
            }
        },
        mounted() {
        },
        methods: {
            onselect() {
               this.$nextTick(function() {
                 this.$emit('onSearch', this.data)
               })
            }
        }

    }

</script>
