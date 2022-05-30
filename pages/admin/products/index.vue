<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else class="pt-6 px-4 flex flex-col">
    <div
      class="
        flex flex-col
        items-start
        md:flex-row md:justify-between md:items-center
      "
    >
      <h1 class="text-2xl font-semibold">Все товары</h1>
      <nuxt-link :to="{ name: 'admin-products-create' }">
        <el-button type="primary">Добавить товар</el-button>
      </nuxt-link>
    </div>
    <div class="flex flex-col">
      <el-table
        ref="multipleTable"
        :data="products"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column property="name" label="Наименование" width="200" />
        <el-table-column property="article" label="Артикул" width="120" />
        <el-table-column property="actualPrice" label="Стоимость" width="120" />
      </el-table>
    </div>
    <div class="flex justify-center pt-2">
      <el-pagination
        :page-size.sync="pagination.perPage"
        background
        :pager-count="pagination.perPage"
        @prev-click="paginationPrevClick"
        @next-click="paginationNextClick"
        @current-change="paginationCurrentChange"
        layout="prev, pager, next"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    // ...mapState({
    //   products: (state) => state.products.products,
    // }),
    ...mapGetters({
      products: 'products/getProducts',
      pagination: 'products/getPagination',
    }),
  },
  data() {
    return {}
  },
  methods: {
    onOpenDialog() {
      this.$router.push('/admin/products/create')
    },
    onShowAcceptDialog() {
      // this.$store.commit("admin/ui/setAcceptDialogHeader", "Удаление товара");
      // this.$store.commit(
      //   "admin/ui/setAcceptDialogBody",
      //   "Вы действительно хотите удалить товар?"
      // );
      // this.$store.commit("admin/ui/setVisibilityAcceptDialog", true);
    },
    onCheckAllProduct() {
      //this.products
    },
    onDeleteProduct(product) {
      this.$store.commit('products/deleteSingleProduct', product)
    },
    onEditProduct(product) {
      this.$store.commit('products/setProduct', product)
      this.$router.push('/admin/products/create')
      // this.$store.commit('products/setShowCreateDialog', true)
    },

    paginationPrevClick() {
      this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.prev
      )
    },
    paginationNextClick() {
      this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.next
      )
    },
    paginationCurrentChange(page) {
      const params = { page: page }
      this.$store.dispatch('products/fetchProductsByFilter', params)
    },
  },
  async fetch() {
    await this.$store.dispatch('products/fetchProductsByFilter')
  },
  mounted() {
    if (!this.products.length)
      this.$store.dispatch('products/fetchProductsByFilter')
  },
}
</script>

<style>
</style>
