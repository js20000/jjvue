# jjvue
## jjvue是一个基于elementui的vue组件套装，核心组件是jj-table。
## 根据json渲染table
## 目标是用一套组件标准化后台管理系统的开发，减少重复工作，提高开发效率。
## 支持表头自定义 排序 搜索 分页


## Vue Component Example

This is an example of a Vue component that uses `jj-table` and `jj-dialog` to render a table and handle related events.

```vue
<template>
  <div class="app-container">
    <!-- jj-table component -->
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

    <!-- jj-dialog component -->
    <jj-dialog ref="dlg" :data="dlg">
      <edit :data="dlg.formData"/>
    </jj-dialog>
  </div>
</template>

<script>
// Import edit component
import edit from './edit'

export default {
  name: 'TableIndex',
  components: { edit },
  data() {
    // Data properties
  },
  mounted() {
    // Mounted hook
  },
  methods: {
    // Methods
  }
}
</script>
