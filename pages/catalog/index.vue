<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <Container class="flex flex-col pt-4 md:pt-0">
    <div class="flex flex-col md:flex-row md:gap-x-4">
      <div class="flex items-start pb-2 md:hidden">
        <el-button type="primary" plain icon="el-icon-menu" @click="handleShowDrawerFilters">
          Фильтры
        </el-button>
      </div>
      <aside class="hidden md:block">
        <div class="h-full pointer-events-none overflow-visible">
          <div class="
              overflow-auto
              pointer-events-auto
              max-h-screen
              sticky
              top-[80px]
              w-60
            ">
            <div class="
                flex
                flex-col
                overflow-y-auto
                sticky
                w-full
                max-h-full
                pb-4
              ">
              <div class="space-y-2">
                <LazyProductFilters />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="w-full min-w-0 md:static md:max-h-full md:overflow-visible">
        <div class="flex flex-col">
          <div v-if="$fetchState.pending" class="grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3">
            <el-skeleton v-for="i in 16" :key="i" style="width: 100%" :loading="$fetchState.pending" animated>
              <template slot="template">
                <el-skeleton-item variant="image" style="width: 100%; height: 176px;" />
                <div style="padding: 0.5rem;">
                  <el-skeleton-item variant="h3" style="width: 50%;" />
                  <el-skeleton-item variant="text" style="margin-right: 16px;" />
                  <el-skeleton-item variant="h1" style="width: 30%;" />
                </div>
              </template>
            </el-skeleton>
          </div>

          <ProductNoProductsCard v-if="!products.length && !$fetchState.pending" class="grow" />
          <div v-else class="grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3">
            <nuxt-link v-for="product in products" :key="product.id"
              :to="{ path: '/catalog/product', query: { id: product.id } }" replace>
              <LazyProductCard :product="product" />
            </nuxt-link>
          </div>
          <div v-if="pagination.lastPage > 1" class="flex justify-center mb-2">
            <el-pagination :page-size.sync="pagination.perPage" background :page-count="pagination.perPage"
              @current-change="paginationCurrentChange" layout="pager" :total="pagination.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-drawer title="Фильтры" :visible.sync="drawerFiltersVisibly" direction="ltr" size="100%">
      <div class="px-4">
        <LazyProductFilters />
      </div>
    </el-drawer>
  </Container>
</template>

<script>
const ElButton = () => import('~/node_modules/element-ui/lib/button')
const ElPagination = () => import('~/node_modules/element-ui/lib/pagination')
const ElDrawer = () => import('~/node_modules/element-ui/lib/drawer')

import { mapGetters } from 'vuex'
export default {
  name: 'ProductPage',
  layout: 'index',
  components: {
    ElButton, ElPagination, ElDrawer
  },
  data() {
    return {
      drawerFiltersVisibly: false
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
    async paginationCurrentChange(page) {
      const params = { page: page }
      await this.$store.commit('api/products/filters/addFilter', params)
      await this.$store.dispatch('products/fetchProductsByFilter')
      window.scrollTo(0, 0)
    },
    handleShowDrawerFilters() {
      this.drawerFiltersVisibly = !this.drawerFiltersVisibly
    }
  },
  async fetch() {
    const { store, query } = this.$nuxt.context
    await store.commit('api/products/filters/setFilters', query)
    await store.dispatch('products/fetchProductsByFilter')
  },
  created() {
    this.$nuxt.$on('drawer-filters-visibly', () => {
      this.drawerFiltersVisibly = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('drawer-filters-visibly')
  }
}
</script>
