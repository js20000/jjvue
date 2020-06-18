<!--suppress ALL -->
<template>

  <xselect
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
    :placeholder="data.data.placeholder?data.placeholder:data.label"
    @change="onselect"
    @clear="onselect"
    style="width: 100%;"

  />

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
