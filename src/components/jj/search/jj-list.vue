<!--suppress ALL -->
<template>
    <div>
 <xlist
:label="data.label"
        :url="xUrl"
        :word="data.data.word"
        v-model="data.value"
        :valField="data.data.valField"
        :disField="data.data.disField"
        :defaultWord="data.data.defaultWord"
        :defaultVal="data.data.defaultVal"
        :defaultDis="data.data.defaultDis"
        :size="size"
        @xselect="xselect"
        :force="!!data.data.force"
        style="width: 100%;"

 > </xlist>
    </div>
</template>

<script>
  export default {
    name: 'SearchList',
    components: {},
    props: {
      data: { // searchItem
        type: Object,
        default() {
          return {
            data: {

            }
          }
        }
      }
    },
    computed: {
      xUrl: function() {
        if (typeof this.data.data.url == 'function') {
           return this.data.data.url.apply(this.data.vm, [this.data])
        }
        return this.data.data.url
      },
      size: function() {
        return this.data.data.size ? this.data.data.size : 'medium'
      }
    },
    mounted() {
      // console.log(JSON.stringify(this.data))
    },
    methods: {
      xselect() {
        this.$nextTick(function() {
          this.$emit('onSearch', this.data)
        })
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
