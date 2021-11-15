<!--suppress ALL -->
<template>
  <div class="app-container">
    <jj-table
@onSearch="$message.info('search msg ok')"
      ref="table"
      :data="data"
      :columns="columns"
      @refresh="refresh"
      @add="add"
      @edit="edit"
@editOk="editOk"
@editCancel="editCancel"
@mail="mail"
      @delit="deleteit">
    </jj-table>

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
      img: require('@/assets/logo.png'),
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
        searchType: 0,
        // hiddenHeader: true,
        height: 'auto',
        sorts: { scode: 'ascending' },
        searchs: [
          // { field: 'keyword', type: 'jj-date', label: '截止时间', value: '', data: {
          //     type: 'datetimerange'
          //   }},
          // { field: 'keyword', label: '其他日期', type: 'jj-date', data: {
          //     type: 'date', format: 'yyyy年MM月dd日'
          //   }},
          { field: 'keyword', label: '编号', value: '' },
          // { field: 'search_eq_a', label: '日期', value: 0, type: 'jj-date',
          //   data:{
          //       el:"el-date-picker",
          //       type:"daterange"
          //   }
          // },
          { field: 'search_eq_swarehouseid', label: '列表', value: 0, type: 'jj-list', disValue: '',
            data: {
              url: [{ val: 0, id: 'a' }, { val: 1, id: 'b' }], word: 'search_like_scnname', disField: 'id', valField: 'val', defaultVal: 1
            }},
            { field: 'search_eq_sotherid', label: '选择', type: 'jj-xselect', placeholder: '请选择', value: 1,
                data: {
                    list: [{ val: 0, id: 'a' }, { val: 1, id: 'b' }], disField: 'id', valField: 'val', force: true
                }},
          { field: 'semail', label: '邮箱', value: '' },
          { field: 'suser', label: '客户名称', value: '' },
          { field: 'suser', label: '客户名称1', value: '' },
          { field: 'suser', label: '客户名称2', value: '' }
        ],
        toolbars: [
          {
            label: '新增', icon: 'el-icon-circle-plus-outline', event: 'add', plain: true, type: 'success'
          },
          {
            label: '删除', icon: 'el-icon-remove-outline', event: 'delit', plain: true, type: 'success'
          }
        ],
        page: {}
      },
      columns: [
        { label: '姓名', field: 'a', sort: true, width: 120, search: true, type: 'jj-xinput', rules: [{ required: true, message: '这是必填项', trigger: 'blur' }] },
        // { label: 'x', field: 'x', sort: true, width: 120, type: 'jj-image', search: true },
        { label: '公司名称', field: 'b', sort: true, width: 320, link: function({ row }) {
            return 'success'
          }, templet: function({ row }) {
            return ''
          } },
        { label: '客户名称', field: 'c', sort: true, search: true, width: 220, templet: function({ row }) {
            return row.c
          } },

        { label: '手机', field: 'd', sort: true, width: 120, type: 'jj-checkbox' },
        { label: '邮箱', field: 'f.b', sort: true, width: 120, event: 'mail', link: 'danger', align: 'right' },
        { field: '备注', label: 'f.a', sort: true, width: 100 },
        { label: '操作', width: 240, type: 'jj-listlink', fixed: 'right', data: {
            buttons: [
              {
                label: function() {
                  return 'aaa'
                },
                icon: 'edit', event: 'editOk', templet: function({ btn, row }) {
                  return true
                }
              },
              { label: '耕作', icon: 'edit', event: 'edit', templet: function({ btn, row }) {
                  return true
                } },

              { label: '确定', icon: 'ok', event: 'editOk', state: 'edit' },
              { label: '撤销', icon: 'cancel', event: 'editCancel', state: 'edit' }
            ],
            list: [
              { label: '重建表', icon: 'el-icon-refresh', event: 'makeSqlTable', hidden: x => true },
              { label: '修改SQl', icon: 'ok', event: 'makeSqlAddCol', hidden: x => false },
              { label: '生成jpa', icon: 'edit', event: 'makeSingle', hidden: x => true },
              { label: '路由表', icon: 'edit', event: 'routeInfo', hidden: x => true },
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
        showSum() {
          return ['合计', '']
        },
        refresh: function(data) {
          console.log(JSON.stringify(data))
          const dt = []
          for (let i = 0; i < 50; i++) {
            dt.push({ a: 2, b: 'bb', c: 1, d: 1, x: this.img, f: { a: 'mail', b: 'mailb' }})
          }
          this.data.page = dt
          // this.data.page = [{ a: 1, b: 'bb', c: 1, d: 1, f: { a: 1, b: 2, c: 3 }, x: 'https://www.baidu.com/img/dongd_36a8aab08b12ba911d74444058393b08.gif' }, { a: 2, b: 'bb', c: 1, d: 1 }]
        },
        add: function({ btn }) {
          this.dlg.icon = btn.icon
          this.$refs.dlg.show()
        },
        edit: function({ row, index, btn }) {
           this.$refs.table.edit(index)
        },
        ok: function() {
          this.$refs.table.edit(-1)
        },
        mail({ row }) {
          this.$message.success('value:' + row.f.b)
        },
        editCancel() {
          this.$refs.table.edit(-1)
        },
        editOk() {
          this.$refs.table.edit(-1)
        },
        deleteit: function({ selections, btn }) {
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
