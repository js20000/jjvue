<template>
  <sort-transfer v-model="value" :inputList="columns" :alias="{key: 'label',label: 'label'}"></sort-transfer>
</template>

<script>
import SortTransfer from './sortTransfer'

export default {
  props: ['data'],
  components: { SortTransfer },

  data() {
    return {
      value: []
    }
  },
  computed: {
    columns() {
       const rs = []
       for (let i = 0; i < this.data.length; i++) {
          const col = this.data[i]
          rs.push({ label: col.label, key: col.label })
       }
       return rs
    }
  },
  methods: {
    up() {

    },
    down() {

    }
  }
}
</script>
