<!--suppress ALL -->
<template>

 <xlist :label="data.label"
        :url="data.data.url"
        :word="data.data.word"
        v-model="data.value"
        :valField="data.data.valField"
        :disField="data.data.disField"
        :defaultWord="data.data.defaultWord"
        :defaultVal="data.data.defaultVal"
        :defaultDis="data.data.defaultDis"
        @xselect="xselect"
        style="width: 100%;"


 > </xlist>

</template>


<script>
  export default {
    name:"SearchList",
    components: {},
    props: {
      data: {
        type: Object,
        default() {
          return {
            data: {

            }
          }
        }
      }
    },
    mounted(){
      //console.log(JSON.stringify(this.data))
    },
    methods: {
      xselect(){
        this.$nextTick(function(){
          this.$emit("onSearch", this.data)
        })      }
      // onselect(obj){
      //   if(this.data.data.valField)
      //     this.data.value=obj[this.data.data.valField]
      //   else
      //     this.data.value=obj[this.data.data.disField]
      // }
    }

  }

</script>
