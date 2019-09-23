<!--suppress ALL -->
<template>
  <div class="app-container">
    <jj-table
      ref="table"
      :data="data"
      :columns="columns"
      @refresh="refresh"
      @add="add"
      @edit="edit"
      @delit="deleteit"/>
    <jj-dialog ref="dlg" :data="dlg" @ok="ok">
      <edit ref="editForm" :data="editObj"/>
    </jj-dialog>
  </div>

</template>
<style>

</style>

<script>
import edit from './edit'

export default {
  name: 'TableIndex',
  components: { edit },
  data() {
    return {
      editObj: {},
      dlg: {
        icon: '',
        title: '标签管理',
        btns: [{
          label: '保存', icon: 'ok', event: 'ok', permission: 'rfid:edit'
        }, {
          label: '取消', icon: 'cancel', event: 'cancel'
        }]
      },
      data: {
        sorts: { scode: 'ascending' },
        searchs: [
          { field: 'search_like_scode', label: '编号', value: '' },
          { field: 'search_eq_swarehouseid', label: '仓库', value: 0, type: 'jj-list', disValue:'',
            data: {
              url: [{val:0,id:'a'},{val:1,id:'b'}], word: 'search_like_scnname', disField: 'id', valField: 'val'
            }}],
        toolbars: [
          {
            label: '新增', icon: 'add', event: 'add', permission: 'rfid:edit'
          },
          {
            label: '删除', icon: 'cancel', event: 'delit', permission: 'rfid:edit', needRow: 1
          }
        ],
        page: {}
      },
      columns: [
        { label: 'a', field: 'a', sort: true, width: 120 ,type:"jj-yesno"},
        { label: 'b', field: 'b', sort: true, width: 320, templet: function({ row }) {
            return row.b
          } },
        { label: 'c', field: 'c', sort: true, width: 220, templet: function({ row }) {
            return row.c
          } },

        { label: 'd', field: 'd', sort: true, width: 120 ,type:"jj-checkbox"},
        { field: 'f.a', label: 'f.a', sort: true, width: 200 , templet: function({ row }) {
            return row.f.a
          } },
        { label: '操作', width: 500, type: 'jj-listbtn', data: {
            buttons: [
              { label: '编辑', icon: 'edit', event: 'edit' },
              { label: '确定', icon: 'ok', event: 'editOk', state: 'edit' },
              { label: '撤销', icon: 'cancel', event: 'editCancel', state: 'edit' }
            ], list: [
              { label: '重建表', icon: 'el-icon-refresh', event: 'makeSqlTable' },
              { label: '修改SQl', icon: 'ok', event: 'makeSqlAddCol' },
              { label: '生成jpa', icon: 'edit', event: 'makeSingle' },
              { label: '路由表', icon: 'edit', event: 'routeInfo' },
              { label: 'CRUD', icon: 'edit', event: 'makeCrud' }

            ]
          }}
      ]
    }
  },
  mounted() {
    this.$refs.table.refresh()
  },
  methods:
      {
        refresh:  function(data) {
          console.log(JSON.stringify(data))
          this.data.page=[{a:1,b:"bb",c:1,d:1 ,f:{a:1,b:2,c:3}}]
        },
        add:  function({ btn }) {
          this.dlg.icon = btn.icon

          this.editObj = getRfid()
          this.$refs.dlg.show()
        },
        edit: function({ row, index, btn }) {
           this.$refs.table.edit(index)
        },
        ok:  function() {
          try {
            const data =  this.$refs.editForm.validate()
            this.$message.success('保存成功!')
            this.$refs.dlg.close()
            this.$refs.table.refresh()
          } catch (e) {
            console.warn(e)
          }
        },
        deleteit:  function({ selections, btn }) {
          try {
            if (selections.length == 0) {
              throw new Error('请选要删除的行!')
            }

            this.$message.success('删除成功!')
            this.$refs.table.refresh()
          } catch (e) {
            this.$message.error(e)
          }
        }

      }

}
</script>
