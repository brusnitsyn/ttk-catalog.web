<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else class="lg:flex">
    <aside class="fixed z-10 lg:z-0 lg:static">
      <div class="h-full overflow-auto pointer-events-none lg:overflow-visible">
        <div
          class="
            hidden
            lg:block
            overflow-auto
            pointer-events-auto
            max-h-screen
            sticky
            top-24
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
            <ProductFilters />
          </div>
        </div>
      </div>
    </aside>
    <div class="w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
      <div class="flex flex-col lg:flex-row">
        <div
          v-if="filteredProducts.length"
          class="grow grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3"
        >
          <nuxt-link
            v-for="product in filteredProducts"
            :key="product.id"
            :to="'/products/' + product.id"
          >
            <LazyProductCard :product="product" />
          </nuxt-link>
        </div>

        <ProductNoProductsCard v-else class="grow" />

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
      openDialog: 'ui/getOpenDialog'
    }),
  },

  async fetch() {
    await this.$store.dispatch('products/fetchAllProducts')
  },
  mounted() {
    if (!this.products.length) {
      this.$store.dispatch('products/fetchAllProducts')
    }

    // this.$store.dispatch('products/setShowCreateDialog', true)
  },
}
</script>
