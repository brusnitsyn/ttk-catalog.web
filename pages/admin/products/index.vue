<template>
  <Loading v-if="$fetchState.pending" />
  <el-container v-else direction="vertical" class="pt-6 px-4">
    <div class="
        flex
        items-center
        flex-row justify-between
      ">
      <el-page-header @back="$router.go(-1)" class="text-2xl font-semibold" title="Назад" content="Все товары" />
      <!-- <nuxt-link :to="{ name: 'admin-products-create' }">
        <el-button type="primary">Добавить товар</el-button>
      </nuxt-link> -->
    </div>
    <el-table ref="multipleTable" :data="products" class="w-full" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="Наименование" width="200" />
      <el-table-column property="article" label="Артикул" width="120" />
      <el-table-column property="actualPrice" label="Стоимость" width="120" />
      <el-table-column label="Действия" min-width="200">
        <template slot-scope="scope">
          <el-button type="text">Редактировать</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-2">
      <el-pagination v-if="pagination.lastPage > 1" :page-size.sync="pagination.perPage" background
        :pager-count="pagination.perPage" @prev-click="paginationPrevClick" @next-click="paginationNextClick"
        @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
      </el-pagination>
    </div>
  </el-container>
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
    handleEdit() {

    },
    handleDelete(index, row) {
      // Here you can access the row data (objects in the object array) to be deleted
      console.log(index, row);
      this.$confirm('Это действие удалит элемент без возможности восстановления. Продолжить?', 'Внимание', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('products/deleteSingleProduct', row)
        //this.tableData.splice(index, 1);
        this.$message({
          type: 'success',
          message: `Элемент "${row.name}" был удален`
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        });
      });
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
