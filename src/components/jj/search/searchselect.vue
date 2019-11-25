<!--suppress ALL -->
<template>

  <div class="block">
    <el-select v-model="data.value"
               :value-key="data.data.valuekey?data.data.valuekey:data.data.valField"
               clearable
               filterable
               :size="data.data.size"
               :remote="data.data.remote"
               :remote-method="data.data.remoteMethod"
               :placeholder="data.placeholder?data.placeholder:data.label"
               @change="onselect"
               @clear="onselect"
      >
      <el-option
        v-for="item in list"
        :key="item[data.data.valField]"
        :label="item[data.data.disField]"
        :value="item[data.data.valField]"/>
    </el-select>
  </div>
<!--  <xselect-->
<!--    :field="data.field"-->
<!--    :size="data.data.size?data.data.size:'small'"-->
<!--    :data="data.data.list"-->
<!--    :url="data.data.url"-->
<!--    :val-field="data.data.valField"-->
<!--    :dis-field="data.data.disField"-->
<!--    :param="data.data.param"-->
<!--    :force="data.data.force"-->
<!--    :remote="data.data.remotemethod?true:false"-->
<!--    :remote-method="data.data.remotemethod"-->
<!--    :placeholder="data.data.placeholder?data.placeholder:data.label"-->
<!--    @onselect="onselect"-->
<!--    @onclear="onselect"-->
<!--    />-->

</template>


<script>
    export default {
        name: "SearchSelect",
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
                list: (this.data.data.list == null || typeof this.data.data.list == "undefined") ? [] : this.data.data.list
            }
        },
        mounted() {
            this.initSelect()
        },
        methods: {
            initSelect: async function () {
                console.log(this.data.data.url)
                if(typeof this.data.data.url != "undefined" && this.data.data.url != null && this.data.data.url != ''){
                    console.log(this.data.data.url)
                    const rs = await this.$post(this.data.data.url, this.data.data.param?this.data.data.param:{})
                    console.log(rs)
                    if (rs.data && rs.data.content) {
                        this.list = rs.data.content
                    } else {
                        this.list = rs.data
                    }
                    this.$emit('ondata', rs.data)
                }
                if((this.data.value == null
                    || this.data.value == '')
                    && this.list.length > 0
                    && this.data.data.force != null
                    && this.data.data.force === true
                    ){
                    if("value" in this.data){
                        this.data.value = this.list[0][this.data.data.valField]
                    }else{
                        this.$set(this.data,'value',this.list[0][this.data.data.valField])
                    }
                    this.$emit("onSearch", this.data)
                }
            },
            onselect() {
                this.$emit("onSearch", this.data)
            }
            // onselect(obj){
            //   if(this.data.data.valField)
            //     this.data.value=obj[this.data.data.valField]
            //   else
            //     this.data.value=obj[this.data.data.disField]
            // }
        }

    }

</script>
