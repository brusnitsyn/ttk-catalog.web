<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else class="flex flex-col pt-4 md:pt-0">
    <div class="md:flex md:gap-x-4">
      <aside class="fixed z-10 md:z-0 md:static">
        <div class="h-full overflow-auto pointer-events-none md:overflow-visible">
          <div class="
              hidden
              md:block
              overflow-auto
              pointer-events-auto
              max-h-screen
              sticky
              top-[79px]
              w-60
            ">
            <div class="
                hidden
                md:flex
                flex-col
                overflow-y-auto
                sticky
                max-h-full
                pb-4
              ">
              <!-- <h1 class="font-bold text-xl">Фильтры</h1> -->
              <div class="space-y-2">
                <ProductFilters />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="w-full min-w-0 md:static md:max-h-full md:overflow-visible">
        <div class="flex flex-col">
          <div v-if="products.length" class="grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3">
            <nuxt-link v-for="product in products" :key="product.id" :to="'/catalog/product?id=' + product.id">
              <LazyProductCard :product="product" />
            </nuxt-link>
          </div>
          <ProductNoProductsCard v-else class="grow" />
          <div v-if="pagination.lastPage > 1" class="flex justify-center mb-2">
            <el-pagination :page-size.sync="pagination.perPage" background :pager-count="pagination.perPage"
              @prev-click="paginationPrevClick" @next-click="paginationNextClick"
              @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProductPage',
  layout: 'index',
  data() {
    return {
      // products: [],
      // filteredProducts: [],
      // product: {},
      // openDialog: false
    }
  },
  head() {
    return {
      title: `Онлайн-каталог запчастей | Компания ТТК+`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Купить запчасти на сельхозтехнику по самой низкой цене в интернет-магазине запчастей`
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      filteredProducts: 'products/getFilteredProducts',
      openDialog: 'ui/getOpenDialog',
      pagination: 'products/getPagination',
    }),
  },
  methods: {
    async paginationPrevClick() {
      await this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.prev
      )
      window.scrollTo(0, 0)
    },
    async paginationNextClick() {
      await this.$store.dispatch(
        'products/fetchAllProducts',
        this.pagination.links.next
      )
      window.scrollTo(0, 0)
    },
    async paginationCurrentChange(page) {
      const params = { page: page }
      await this.$store.dispatch('products/fetchProductsByFilter', params)
      window.scrollTo(0, 0)
    },
  },
  async fetch() {
    if (this.$router.query != null) {
      await this.$store.dispatch('products/fetchProductsByFilter')
      return
    }
    await this.$store.dispatch('products/fetchProductsByFilter')
  },
  mounted() {
    if (!this.products.length) {
      this.$store.dispatch('products/fetchProductsByFilter')
    }

    // this.$store.dispatch('products/setShowCreateDialog', true)
  },
}
</script>
