<!--suppress ALL -->
<template>
  <div class="app-container">
    <jj-table @onSearch="$message.info('search msg ok')"
      ref="table"
      :data="data"
      :columns="columns"
      @refresh="refresh"
      @add="add"
      @edit="edit"
      @delit="deleteit"/>


    <jj-dialog ref="dlg"  :data="dlg">
      <edit :data="dlg.formData"/>

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
        formData: { sremark: '', id: '', posid: '' },
        icon: '',
        title: '处理报警',
        btns: [{
          label: '保存', icon: 'ok', event: 'ok', permission: ''
        }, {
          label: '取消', icon: 'cancel', event: 'cancel'
        }]
      },
      data: {
        sorts: { scode: 'ascending' },
        searchs: [
          { field: 'search_like_scode', label: '编号', value: '' },
          { field: 'search_eq_a', label: '日期', value: 0, type: 'jj-date',
            data:{
                el:"el-date-picker",
                type:"daterange"
            }
          },
          { field: 'search_eq_swarehouseid', label: '列表', value: 0, type: 'jj-list', disValue:'',
            data: {
              url: [{val:0,id:'a'},{val:1,id:'b'}], word: 'search_like_scnname', disField: 'id', valField: 'val',defaultVal:1
            }},
            { field: 'search_eq_sotherid', label: '选择', type: 'jj-xselect',placeholder: '请选择', value: 1,
                data: {
                    list: [{val:0,id:'a'},{val:1,id:'b'}], disField: 'id', valField: 'val',force:true
                }}
        ],
        toolbars: [
          {
            label: '新增', icon: 'add', event: 'add'
          },
          {
            label: '删除', icon: 'cancel', event: 'delit', permission: 'rfid:edit', needRow: 1
          }
        ],
        page: {}
      },
      columns: [
        { label: 'a', field: 'a', sort: true, width: 120 ,type:"jj-yesno"},
        { label: 'x', field: 'x', sort: true, width: 120 ,type:"jj-image"},
        { label: 'b', field: 'b', sort: true, width: 320, templet: function({ row }) {
            return row.b
          } },
        { label: 'c', field: 'c', sort: true, width: 220, templet: function({ row }) {
            return row.c
          } },

        { label: 'd', field: 'd', sort: true, width: 120 ,type:"jj-checkbox"},
        { label: 'f.b', field: 'f.b', sort: true, width: 120 },
        { field: 'f.a', label: 'f.a', sort: true, width: 200 },
        { label: '操作', width: 500, type: 'jj-listbtn', data: {
            buttons: [
              { label: '编辑', icon: 'edit', event: 'edit' ,templet:function ({btn,row}) {
                  // btn.hidden=true
                } },
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
          this.data.page=[{a:1,b:"bb",c:1,d:1 ,f:{a:1,b:2,c:3},x:'https://www.baidu.com/img/dongd_36a8aab08b12ba911d74444058393b08.gif'},{a:2,b:"bb",c:1,d:1 }]
        },
        add:  function({ btn }) {
          this.dlg.icon = btn.icon
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
