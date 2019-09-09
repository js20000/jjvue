<!--suppress ALL -->

<template>
  <div>

   <div class="el-select" >
    <div class="el-input el-input--suffix ">
      <div class="el-input el-input--medium  el-input-group el-input-group--prepend">
        <div class="el-input-group__prepend" v-if="label">{{label}}</div>
        <el-input
          type="text"
          ref="thisinput"
          :class="xclass"
          v-bind:value="value"
          @blur="onblur"
          @keydown.native="keydown"
          v-on:input="onchange"
          @mousedown.native="onclick"
          v-on:focus="onfocus"
autocomplete="off"
/>
      </div>

      <span class="el-input__suffix"><span class="el-input__suffix-inner">
      <i class="el-select__caret el-input__icon el-icon-arrow-up "  @mousedown="onclick_i"></i>
    </span></span>
    </div>
     <ul ref="thistable" class="el-dropdown-menu el-popper" :style="style">
       <li
tabindex="-1"
class="el-dropdown-menu__item"
@mousedown="trclick(index)"
:class="selected==index?'ct':''"
v-for="(i,index) in list"
:key="index">
       {{templet?templet(i):(field?i[field]:i)}}
      </li>
     </ul>
<!--     <div ref="thistable" class="bigautocomplete-layout" :style="style">-->
<!--       <table class="layui-table">-->
<!--         <tbody>-->

<!--         <tr @mousedown="trclick(index)" :class="selected==index?'ct':''" v-for="(i,index) in list" :key="index">-->
<!--           <td>-->
<!--             <div :data-index="index">{{templet?templet(i):(field?i[field]:i)}}</div>-->
<!--           </td>-->
<!--         </tr>-->

<!--         </tbody>-->
<!--       </table>-->
<!--     </div>-->
  </div></div>
</template>
<style>
  .ct{
    background: none repeat scroll 0 0 #D2DEE8 !important;
  }

</style>

<script>

export default {
  name: 'XList',
  data: function() {
    return {
      keyword: -9999,
      list: [],
      selected: -1,
      style: {
        display: 'none'
      }
    }
  },

  props: { value: {}, label: {}, word: {}, field: {}, templet: {}, url: {}, para: { type: Object, default() { return {} } }, xclass: {}, force: { type: Boolean, default: true }},
  inheritAttrs: false,
  mounted: function() {

  },
  methods: {
    onchange: function() {
      let rs = {}
      if (this.field) {
        rs[this.field] = event.target.value
      } else { rs = event.target.value }
      this.selected = -1
      this.onselected(rs)

      // event.target.value;
      this.post(event.target.value)
    },
    onclick: function() {
       event.preventDefault()
      //
      // // $(event.target).select()
     // this.$refs.thisinput.select()
      event.target.focus()
      event.target.select()
      event.target.selectionStart = 0
      event.target.selectionEnd = event.target.value.length
     // this.$refs.thisinput.$el.selectionStart = 0
     // this.$refs.thisinput.$el.selectionEnd = this.$refs.thisinput.$el.value.length
      // // event.target.selectionStart = 0
      // // event.target.selectionEnd = event.target.value.length
      //
       this.post(this.keyword)
    },
    onclick_i: function() {
      if (this.style.display == 'block') {
        this.style.display = 'none'
        return
      }
      this.post(this.keyword)
    },
    onfocus: function() {
     // event.preventDefault()
      // $(event.target).focus().select()

      // if(this.value==event.target.value)
      //     return;
      // if(this.style.display=='block')
      //     return;
      //this.post(this.keyword)
      this.$emit("focus")
    },
    post: async function(val) {
      const vm = this

      if (val == -9999) {
        const pos = this.$refs['thisinput'].$el
        this.style.top = pos.offsetTop + pos.clientHeight + 'px'
        this.style.left = pos.offsetLeft + 'px'
        this.style.width = pos.clientWidth + 'px'
        val = ''
      }

      if (val == this.keyword) {
        this.selected = -1
        for (let i = 0; i < this.list.length; i++) {
          const xx = (this.field ? this.list[i][this.field] : this.list[i])

          if (xx == vm.value) {
            this.selected = i
            this.scrollto()
            break
          }
        }
        this.style.display = 'block'
        return
      }
      if (typeof this.url == 'object') {
        let flist = this.url.map(x => {
          if (typeof x == 'string') {
              if (x && x.indexOf(val) >= 0) {
                return null
              } else {
                return x
              }
          } else {
            for (const i in x) {

              if (typeof x[i] =='string' )
              {
                return x
              }
            }
            return null
          }
        })
        this.list=flist;

      }
      else{
        this.keyword = val
        let word = 'keyword'
        if (this.word) { word = this.word }
        const para = { }
        para[word] = val
        if (this.para) {
          for (const k in this.para) {
            para[k] = this.para[k]
          }
        }
        const rs = await this.$post(this.url, para)
        if (rs.data && rs.data.content) { vm.list = rs.data.content } else { vm.list = rs.data }
        vm.$emit('ondata', rs.data)

        vm.selected = -1
        for (let i = 0; i < vm.list.length; i++) {
          const xx = (vm.field ? vm.list[i][vm.field] : vm.list[i])

          if (xx == vm.value) {
            vm.selected = i
            vm.scrollto()
            break
          }
        }
      }
      this.$nextTick(function () {
        vm.style.display = 'block'
      })

    },
    onblur: function() {
      this.style.display = 'none'
      if (this.selected < 0 && this.force == true) {
        let rs = {}

        if (this.field) {
          rs[this.field] = ''
        } else { rs = '' }

        this.keyword = -9999

        this.onselected(rs)
        this.$emit('blur')
      }
    },
    trclick: function(index) {
      event.preventDefault()
      // let div = $(event.target).parent().find('div')
      // let index = div.data('index')
      this.style.display = 'none'
      // this.selected=index;
      this.onselected(this.list[index])
      this.selected = index
    },
    onselected: function(obj) {
      this.$emit('xselect', obj)
      let rs = {}
      if (this.field) {
        rs = obj[this.field]
      } else { rs = obj }
      this.$emit('input', rs)
    },
    scrollto: function() {
      // let div = this.$refs['thistable']
      // let h = $(div).find('tr:first').height()
      // $(div).scrollTop(h * (this.selected + 5) - $(div).height())
    },
    keydown: function() {
      const node = event.currentTarget
      switch (event.keyCode) {
        case 13:
          this.onselected(this.list[this.selected])
          this.style.display = 'none'
          break
        case 40:// 向下键

          if (this.style.display == 'none') { return }

          this.selected++
          if (this.selected >= this.list.length) { this.selected = 0 }
          this.onselected(this.list[this.selected])
          this.scrollto()
          // if(this.selected >= 0){//有下一行时（不是最后一行）

          // }
          break
        case 38:// 向上键
          if (this.style.display == 'none') { return }
          this.selected--
          if (this.selected < 0) { this.selected = this.list.length - 1 }
          this.onselected(this.list[this.selected])
          this.scrollto()

          break
        case 27:// ESC键隐藏下拉框
          this.style.display = 'none'

          break
      }
    }
  },
  watch: {
    // 'style.display': {
    //     handler(newName, oldName) {
    //
    //     }
    // }
  }

}
</script>

