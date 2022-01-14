<template>
  <el-form size="small" @submit.native.prevent class="jj-search-form">
    <div v-if="searchType==0 && searchs.length>0" :style="rowStyle">
      <jj-button :btn="moreBtn" class="sermore" v-if="searchRows.length > 1" @click="showSearchAll" />
      <el-row  type="flex" v-for="(rows,index) in searchRows" :key="index">
        <template  v-for="(s) in rows"  >
        <el-form-item :key="s.label" :style="{display:s.hidden?'none':''}" label-width="0px" >
          <template v-if="s.type" >
            <component :is="s.type" :data="s"   @onSearch="onSearch"  :style="{width: s.width+'px'}" />
          </template>
          <el-input v-else :placeholder="s.placeholder" v-model="s.value"  @keydown.native="keyDown($event,s)" :style="{width: s.width+'px'}">
            <template slot="prepend">{{ s.label }}</template>
          </el-input>
       </el-form-item>
        </template>

      </el-row>
      <slot/>
    </div>

  </el-form>
</template>
<script>

export default {
  name: 'JjSearch',
  props: {
    vm: {
      type: Object
    },
    searchType: {
      type: Number,
      default() { return 0 }
    },
    searchs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      moreBtn: { label: '展开', icon: 'el-icon-s-operation', plain: false, type: 'blue', size: 'small' },
      rowStyle: {
        'padding-right': '140px',
        'position': 'relative',
        'height': ' 40px',
        'overflow': 'hidden'
      },
      drawer: false,
      screenWidth: document.body.clientWidth
    }
  },
  computed: {
    colCount() {
     return Math.floor((this.screenWidth - 180) / 300)
    },
    searchRows() {
        const size = this.colCount
        const rs = []
        let r = []
        let len = 0
        for (let i = 0; i < this.searchs.length; i++) {
           const col = this.searchs[i]
           if (col.type == '|') {
             rs.push(r)
             r = []
             len = 0
             continue
           }
            r.push(col)
          if (!col.hidden) {
            len++
          }
            if (len == size) {
              rs.push(r)
              r = []
              len = 0
            }
        }
        if (r.length > 0) {
          rs.push(r)
        }
        return rs
    }
  },
  mounted: function() {
      for (const item of this.searchs) {
        item.vm = this.vm
      }
  },
  methods: {
    showSearchAll() {
      if (this.moreBtn.label == '收起') {
        this.rowStyle.height = '40px'
        this.moreBtn.label = '展开'
        this.moreBtn.icon = 'el-icon-s-operation'
      } else {
        this.rowStyle.height = 'auto'
        this.moreBtn.label = '收起'
        this.moreBtn.icon = 'el-icon-upload2'
      }
      this.$nextTick(() => {
        this.$emit('heightChange')
      })
    },
    trigger(btn) {
      if (btn.event) { this.$emit('event', { btn }) }
    },
    keyDown(event, data) {
      if (event.keyCode == 13) {
        this.onSearch(data)
      }
    },

    onSearch(data) {
      this.$emit('onSearch', data)
    },
    buildData(s) {
        return s
    },
    refresh() {
      this.$emit('resetPage')
      this.$emit('refresh')
    },
    reset() {
      this.$emit('resetPage')
      this.$emit('reset')
    }
  }
}
</script>

<style>

.jj-search-form {

.el-input-group__prepend:after{
  content: "：";
}
.el-input--suffix .el-input__inner {
  padding-right: 5px!important;
}
.el-select{
  width:100%;
}
.el-row{
  height: 40px;
}
.el-button--small, .el-button--small.is-round {
  padding: 7px 10px;
}
.el-input-group__prepend {
  width: 110px;
  text-align: right;
  background: none;
  border: none;
  padding-right: 0px!important;
  padding-left: 5px!important;
}

.el-input-group--prepend .el-input__inner, .el-input-group__append {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 32px;
  line-height: 32px;
}
}

.row-con{
  padding-right: 140px;
  position: relative;
  height: 40px;
  overflow: hidden;
}
.sermore{
  position:absolute;
  right: 10px;
  top:0px
}

</style>
