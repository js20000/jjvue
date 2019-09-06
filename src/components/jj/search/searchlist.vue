<!--suppress ALL -->
<template>

  <xlist @xselect="onselect" :label="data.label" :url="data.data.url"  :word="data.data.word" v-model="data.data.disValue"  :field="data.data.disField" > </xlist>

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
      console.log(JSON.stringify(this.data))
    },
    methods: {
      onselect(obj){
        if(this.data.data.valField)
          this.data.value=obj[this.data.data.valField]
        else
          this.data.value=obj[this.data.data.disField]
      }
    }

  }

</script>
