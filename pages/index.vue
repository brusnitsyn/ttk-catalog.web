<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <Container class="lg:flex">
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
          <div class="grow grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3">
            <nuxt-link
              v-for="product in filteredProducts"
              :key="product.id"
              :to="'/products/' + product.id"
            >
              <LazyProductCard :product="product" />
            </nuxt-link>
          </div>

          <div
            class="
              hidden
              z-10
              left-0
              flex-none
              w-full
              mr-8
              text-sm
              bg-white
              border-b border-gray-200 border-opacity-50
              xl:relative xl:border-0
              dark:border-gray-800
              bg-opacity-80
              dark:bg-gray-900 dark:bg-opacity-80
              xl:bg-transparent
              dark:xl:bg-transparent
              lg:left-60
              xl:left-0
              sm:pl-6
              lg:pl-4
              xl:w-60
              top-24
              xl:block xl:top-0
            "
          >
            <div
              class="
                hidden
                xl:flex
                flex-col
                justify-between
                overflow-y-auto
                sticky
                max-h-screen
                -mt-10
                pt-2
                pb-4
                top-24
              "
            >
              <div>
                <span
                  >Узнавайте актуальность и цену товара по номеру телефона</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {

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

    this.$store.dispatch('products/setShowCreateDialog', true)
  },
}
</script>
