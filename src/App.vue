<template>
  <div class="app-container">

    <el-container >
      <el-aside width="100px" >
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :expand-on-click-node="false"
          :default-expand-all="true"
          :highlight-current="true"

          @node-click="handleNodeClick"/>
      </el-aside>
      <el-main>
        <component v-if="node&&node.type" :is="node.type" :dev="node"></component>
        <template v-else>


        </template>
      </el-main>
    </el-container>
  </div>
</template>
<style>
  .el-dialog__body {
    padding: 0px 20px!important;
  }
</style>
<script>
 import  {listToTree} from "@/utils"
 import  TableIndex from './test/table'
 import  SequenceEdit from './test/edit'

 export default {
    name: 'JJVueIndex',
    components: { TableIndex,SequenceEdit },
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children'
        },
        node: null,
        domains: [],
        domainsMap: {},
        data() {
          return {}
        }
      }
    },
    mounted() {
      this.menuList()
    },
    methods: {
      handleNodeClick(node) {
        this.node = null
        this.$nextTick(function() {
          this.node = node
        })
      },
       menuList() {
        // (list, id, pid, parent, children) {
        const rs = ["jj-table"]

        const subs = []
        let i = 0
        rs.forEach(x => {
          i++
          subs.push({ id: x, label: x })
          subs.push({ id: i, sparentid: x, label: '例子', md: x, type: 'TableIndex' })
          subs.push({ id: i, sparentid: x, label: '编辑例子', md: x, type: 'SequenceEdit' })
          subs.push({ id: i, sparentid: x, label: '文档', md: x, type: '' })
        })
        //  const { id, pid, parent, children } = para || { id: 'id', pid: 'sparentid', parent: 'parent', children: 'children' }

        this.treeData = listToTree(subs)
      }
    }

  }
</script>
