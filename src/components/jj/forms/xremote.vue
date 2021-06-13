<!--suppress ALL -->
<template>

  <el-select
      remote
      filterable
      :remote-method="remoteMethod"
      v-bind="$attrs"
       v-on="$listeners" >
      <el-option
        v-for="item in list"
        :key="item[valField]"
        :label="item[disField]"
        :value="item[valField]"
      >
      </el-option>
  </el-select>

</template>

<script>
    export default {
        name: 'XRemote',
        components: {},
        props: {
            map: {
              type: Function,
              default(x) {
                return x
              }
            },
            keyword: { type: String, default: 'key' },
            params: {
                   type: Object,
                   default() { return {} }
            },
            valField: { type: String, default: 'id' },
            disField: { type: String, default: 'scnname' },
            url: { type: String, default: '' }
        },
        data: function() {
            return {
                loading: false,
                list: []
            }
        },
        mounted() {
            this.initSelect()
        },
        watch: {
          url(val) {
            this.initSelect()
          }
        },
        methods: {
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true
              this.params[this.keyword] = query
              this.initSelect()
            }
          },
          initSelect: async function() {
              if (this.url != null && this.url != '') {
                  this.loading = true
                  const rs = await this.$post(this.url, this.params)
                  if (rs.data && rs.data.content) {
                      this.list = rs.data.content.map(this.map)
                  } else {
                      this.list = rs.data.map(this.map)
                  }
                  this.loading = false
                  this.$emit('ondata', this.list)
              }
          }

        }

    }

</script>
