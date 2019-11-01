<!--suppress ALL -->
<template>

  <el-button :disabled="disabled"  plain size="small" @click="$emit('click')" :type="btn.type?btn.type:type" v-if="showFlag && hasP ">
    <template v-if="btn.icon">
      <i v-if="btn.icon.indexOf(`el-icon`)==0" :class="btn.icon"/>
      <svg-icon v-else :icon-class="btn.icon"/>
    </template>

    <span class="ml5">{{ btn.label }}</span>
  </el-button>
</template>

<style>

</style>
<style>
  .ml50 {
    margin-left: 5px;
  }
</style>
<script>
  export default {
    props: {
      type:{
        Type: String,
        default:'primary'
      },
      row:{
        Type: Object,
        default:null
      },
      btn: {
        Type: Object,
        default() {
          return {
            disabled: false
          }
        }
      }
    },
    data(){
      return {
        disabled:false
      }
    },
    mounted(){


      if(this.btn.needRow) {
        this.disabled = true
        this.$set(this.btn, "disabled", true)
      }
      else
        this.$set(this.btn,"disabled",false)
    },
    methods:{

    },
    computed:{

      showFlag(){
        if (typeof this.btn.hidden === 'function') {
          return !this.btn.hidden({row:this.row,btn:this.btn})
        }
        else
          return !this.btn.hidden
      },
      hasP(){
         if(!this.btn.permission)
           return true

        if(this.$store)
           return this.$store.getters.has(this.btn.permission)
      }
    },
    watch:{
      'btn.disabled'(v){
        this.disabled=v
      }
    }
  }

</script>
