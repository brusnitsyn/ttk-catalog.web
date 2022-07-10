<template>
  <el-input @input="handleSearch" placeholder="Поиск по каталогу" v-model="search" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</template>

<script>

const ElInput = () => import('~/node_modules/element-ui/lib/input')
const ElButton = () => import('~/node_modules/element-ui/lib/button')

import { debounce } from '~/helpers/index'
export default {
  components: {
    ElInput, ElButton
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleSearch: debounce(function (e) {
      if (!this.search || !!this.search.trim() == '')
        this.$store.commit('api/products/search/clearProducts')

      let searchQuery = { 'search': this.search }
      this.$store.dispatch('api/products/search/fetchProductsBySearchQuery', searchQuery)
    }, 500),
  },
}
</script>
