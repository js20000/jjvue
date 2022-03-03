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
          // { field: 'keyword', type: 'xx-date', label: '截止时间', value: '', data: {
          //     type: 'datetimerange'
          //   }},
          // { field: 'keyword', label: '其他日期', type: 'xx-date', data: {
          //     type: 'date', format: 'yyyy年MM月dd日'
          //   }},
          { field: 'keyword', label: '编号', value: '' },
          // { field: 'search_eq_a', label: '日期', value: 0, type: 'xx-date',
          //   data:{
          //       el:"el-date-picker",
          //       type:"daterange"
          //   }
          // },
          { type: '|' },
          { field: 'search_eq_swarehouseid', label: '列表', value: 0, type: 'jj-list', disValue: '', width: 300,
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
        { label: '公司名称1', field: 'b111', sort: true, width: 320, link: function({ row }) {
            return 'success'
          }, templet: function({ row }) {
            return ''
          }, fixed: 'left' },
        { label: '姓名', field: 'a', sort: true, width: 120, search: true, type: 'xx-input', rules: [{ required: true, message: '这是必填项', trigger: 'blur' }] },
        // { label: 'x', field: 'x', sort: true, width: 120, type: 'jj-image', search: true },

        { field: '备注', label: '备注', sort: true, width: 100, fixed: 'right' },

        { label: '客户名称', field: 'c', sort: true, search: true, width: 220, templet: function({ row }) {
            return row.c
          } },
        { label: '客户名称1', field: 'c', sort: true, search: true, width: 220, templet: function({ row }) {
            return row.c
          } },
        { label: '公司名称', field: 'b', sort: true, width: 320, link: function({ row }) {
            return 'success'
          }, templet: function({ row }) {
            return ''
          }, fixed: 'left' },
        { label: '客户名称2', field: 'c', sort: true, search: true, width: 220, templet: function({ row }) {
            return row.c
          } },

        { label: '手机', field: 'd', sort: true, width: 120, type: 'jj-checkbox' },
        { label: '邮箱', field: 'f.b', sort: true, width: 120, event: 'mail', link: 'danger', align: 'right' },
        { label: '操作', width: 240, type: 'xx-listlink', fixed: 'right', data: {
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
        showSum(_this) {
          const rs = []
          rs.length = this.columns.length + 2
          rs[3] = 'hi'
        //  rs[_this.getColIndex('备注')] = _this.getColIndex('备注')
          rs[_this.getColIndex('', '公司名称')] = '公司名称'

          rs[_this.getColIndex('', '客户名称1')] = '客户名称1'
          rs[_this.getColIndex('', '客户名称2')] = '客户名称2'

          return rs
        },
        refresh: function(data) {
          console.log(JSON.stringify(data))
          const dt = []
          for (let i = 0; i < 50; i++) {
            dt.push({ a: 2, b: 'bb', c: 1, d: 1, x: this.img, f: { a: 'mail', b: 'mailb' }})
          }
          this.data.page = {
            empty: false,
            first: true,
            last: true,
            number: 0,
            numberOfElements: 10,
            size: 15,
            totalElements: 10,
            totalPages: 1,
            content: dt
          }
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
