<!--suppress ALL -->
<template>
  <div  class="el-input el-input-group el-input--small el-input-group--prepend el-input--suffix">
    <div class="el-input-group__prepend"  v-if="data.label">{{data.label}}</div>
    <div>
  <xselect
    :multiple="data.data.multiple?true:false"
    v-model="data.value"
    :label="data.label"
    :size="data.data.size?data.data.size:'small'"
    :data="data.data.list"
    :url="data.data.url"
    :val-field="data.data.valField"
    :dis-field="data.data.disField"
    :param="data.data.param"
    :force="data.data.force"
    :remote="data.data.remotemethod?true:false"
    :remote-method="data.data.remotemethod"
    :placeholder="data.placeholder?data.placeholder:data.label"
    @change="onselect"
    @clear="onselect"
    @ondata="ondata"
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
            ondata(rs) {
              this.$emit('ondata', rs)
            },
            onselect() {
               this.$nextTick(function() {
                 this.$emit('onSearch', this.data)
               })
            }
        }

    }

</script>
