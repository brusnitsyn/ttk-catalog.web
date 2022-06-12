<template>
  <el-input @input="handleSearch" placeholder="Наименование" v-model="search" class="input-with-select">

  </el-input>
</template>

<script>
import { debounce } from '~/helpers/index'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleSearch: debounce(function (e) {
      if (!this.search || !!this.search.trim() == '')
        return

      let searchQuery = { 'search': this.search }
      this.$store.dispatch('api/products/search/fetchProductsBySearchQuery', searchQuery)
    }, 500),

    // goPageResult() {
    //   this.$router.push('/catalog')
    // }
  },
}
</script>
