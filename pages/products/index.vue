<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else class="flex flex-col">
    <div class="lg:flex lg:gap-x-4">
      <aside class="fixed z-10 lg:z-0 lg:static">
        <div
          class="h-full overflow-auto pointer-events-none lg:overflow-visible"
        >
          <div
            class="
              hidden
              lg:block
              overflow-auto
              pointer-events-auto
              max-h-screen
              sticky
              top-[82px]
              w-60
            "
          >
            <div
              class="
                hidden
                lg:flex
                flex-col
                overflow-y-auto
                sticky
                max-h-full
                pb-4
              "
            >
              <!-- <h1 class="font-bold text-xl">Фильтры</h1> -->
              <div class="space-y-2">
                <ProductSearchInput />
                <ProductFilters />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        <div class="flex flex-col">
          <div
            v-if="products.length"
            class="grow grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3"
          >
            <nuxt-link
              v-for="product in products"
              :key="product.id"
              :to="'/products/' + product.id"
            >
              <LazyProductCard :product="product" />
            </nuxt-link>
          </div>
          <ProductNoProductsCard v-else class="grow" />
          <div v-if="pagination.lastPage > 1" class="flex justify-center">
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
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      filteredProducts: 'products/getFilteredProducts',
      product: 'products/getProduct',
      openDialog: 'ui/getOpenDialog',
      pagination: 'products/getPagination',
    }),
  },
  methods: {
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
    if (!this.products.length) {
      this.$store.dispatch('products/fetchProductsByFilter')
    }

    // this.$store.dispatch('products/setShowCreateDialog', true)
  },
}
</script>
