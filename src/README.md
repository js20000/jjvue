## jjvue是一个基于elementui的vue组件套装，核心组件是jj-table。
## 根据json渲染table


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
