<!--suppress ALL -->

<template>
  <div>
        <el-input
          :size="size"
          type="text"
          ref="thisinput"
          :class="xclass"
          v-bind:value="xname"
          @blur="onblur"
          @keydown.native="keydown"
          v-on:input="onchange"
          @mousedown.native="onclick"
          v-on:focus="onfocus"
          autocomplete="off"
          v-bind="$attrs"
        >
            <template slot="prepend" v-if="label">{{ label }} </template>
          <i class="el-input__icon" :class="updown" slot="suffix" @click="onclick">
          </i>
        </el-input>

    <ul ref="thistable" class="el-dropdown-menu el-popper" :style="style">
      <li
        tabindex="-1"
        class="el-dropdown-menu__item"
        @mousedown="trclick(index)"
        :class="selected==index?'ct':''"
        v-for="(i,index) in list"
        :key="index">
        {{templet?templet(i):(disField?i[disField]:i)}}
      </li>
    </ul>
</div>
</template>
<style>

  .ct {
    background: none repeat scroll 0 0 #D2DEE8 !important;
  }

</style>

<script>

  export default {
    name: 'XList',
    data: function() {
      return {
        xname: '',
        bakName: '',
        bakTimer: 0,
        keyword: -9999,
        list: [],
        selected: 0,
        inited: false,
        style: {
          maxHeight: '400px',
          'overflow-y': 'scroll',
          display: 'none'
        }
      }
    },

    props: {
      value: {}, label: {}, word: {}, defaultWord: {
        type: String,
        default: null
      }, valField: {}, disField: {},
      defaultVal: {
        default() { return '' }
      }, templet: {}, url: {},
      para: {
        type: Object, default() {
          return {}
        }
      }, xclass: {},
      force: { type: Boolean, default: true },
      size: { type: String, default: 'small' }
    },
    inheritAttrs: false,
    async mounted() {
      if (!this.inited) {
        await this.postOnly()
        this.initVal(this.value)
      }
    },
    methods: {
      initVal(val) {
        if (!this.force) {
          this.xname = val
        }
        this.xname = ''
        this.selected=-1
        for (let i = 0; i < this.list.length; i++) {
          const xx = this.list[i]
          if (typeof this.valField != 'undefined' && !(this.valField === '')) {
            if (xx[this.valField] === val) {
              this.selected = i
              if (this.disField) {
                this.xname = xx[this.disField]
              }
              break
            }
          } else {
            if (xx === val) {
              this.selected = i
              this.xname = xx
            }
          }
        }
      },
      onchange: function() {
        this.xname = event.target.value
        clearTimeout(this.bakTimer)
        this.bakName = this.xname
        this.bakTimer = setTimeout(this.sendData, 300)
      },
      sendData() {
        this.post(this.xname)
      },
      onclick: function() {

        event.preventDefault()
        if(event.target.disabled)
           return;
        if (this.style.display == 'block') {
           // this.style.display = 'none'
          return
        }
        var t = this.$refs.thisinput.$refs.input
        t.focus()
        t.select()
        t.selectionStart = 0
        t.selectionEnd = t.value.length

        this.post(this.keyword)
      },
      onclick_i: function() {
        event.preventDefault()
        if (this.style.display == 'block') {
          this.style.display = 'none'
          return
        }
        this.post(this.keyword)
      },
      onfocus: function() {
        this.$emit('focus')
      },
      post: async function(val) {
        await this.postOnly(val)
        this.$nextTick(function() {
          this.style.display = 'block'
        })
      },
      getValByXname() {
        const lastSelected = this.selected
        this.selected = -1
        for (let i = 0; i < this.list.length; i++) {
          const xx = (this.disField ? this.list[i][this.disField] : this.list[i])

          if (xx == this.xname) {
            this.selected = i
            if (i == lastSelected) { break }

            this.onselected(this.list[i])
            this.scrollto()
            break
          }
        }
        if (!this.force) {
          this.$emit('input', this.xname)
          return
        }
      },
      postOnly: async function(val) {
        if (!this.inited) {
          const pos = this.$refs.thisinput.$el
          this.style.top = pos.offsetTop + pos.clientHeight + 'px'
          this.style.left = pos.offsetLeft + 'px'
          this.style.width = pos.clientWidth + 'px'
          this.inited = true
        }

        if (val == -9999) {
          val = ''
        }
        if(val)
          val=val.trim()

        if (val == this.keyword) { // 无须提交请求
          this.getValByXname()
          return
        }
        if (typeof this.url == 'object') {
          const flist = this.url.map(x => {
            return x
          })
          this.list = flist
        } else {
          if (this.$store) {
            this.$store.dispatch('myloading', true)
          }
          this.keyword = val
          let word = 'keyword'
          if (this.word) {
            word = this.word
          }
          const para = {}
          para[word] = val
          if (this.para) {
            for (const k in this.para) {
              para[k] = this.para[k]
            }
          }
          const rs = await this.$post(this.url, para)
          if (rs.data && rs.data.content) {
            this.list = rs.data.content
          } else {
            this.list = rs.data
          }
          this.$emit('ondata', rs.data)

          this.getValByXname()
        }
      },
      onblur: function() {
        this.style.display = 'none'
        this.getValByXname()
        if (this.selected < 0 && this.force == true) {
          let rs = {}
          if (this.disField) {
            rs[this.disField] = ''
          } else {
            rs = ''
          }

          if (typeof this.valField != 'undefined') {
            rs[this.valField] = ''
          } else {
            rs = ''
          }

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
        let rs = {}
        if (this.disField) {
          this.xname = obj[this.disField]
        } else { this.xname = obj }
        if (this.valField) {
          rs = obj[this.valField]
        } else {
          rs = obj
        }
        this.$emit('input', rs)
        this.$emit('xselect', obj)
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

            if (this.style.display == 'none') {
              return
            }

            this.selected++
            if (this.selected >= this.list.length) {
              this.selected = 0
            }
            this.onselected(this.list[this.selected])
            this.scrollto()
            // if(this.selected >= 0){//有下一行时（不是最后一行）

            // }
            break
          case 38:// 向上键
            if (this.style.display == 'none') {
              return
            }
            this.selected--
            if (this.selected < 0) {
              this.selected = this.list.length - 1
            }
            this.onselected(this.list[this.selected])
            this.scrollto()

            break
          case 27:// ESC键隐藏下拉框
            this.style.display = 'none'

            break
        }
      }
    },
    computed: {
      loading() {
        if (this.$store) { return this.$store.getters.myloading } else { false }
      },
      updown() {
        if (this.style.display == 'none') {
          return 'el-icon-arrow-down'
        } else {
          return 'el-icon-arrow-up'
        }
      }

    },
    watch: {
      async value(val) {
        if (!this.inited) {
          await this.postOnly()
          this.initVal(val)
        } else {
         this.initVal(val)
        }
      },
      async url(val) {
        await this.postOnly()
        this.initVal(this.value)
      }

    }

  }
</script>

