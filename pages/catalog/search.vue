<template>
  <Container class="flex flex-col gap-y-4 pt-4 md:pt-0">
    <div class="flex flex-col gap-y-2">
      <span>Поиск по каталогу</span>
      <ProductSearchInput />
    </div>

    <div v-if="productSearchResult.length" class="flex flex-col gap-y-2">
      <span>Найдено {{ productSearchResult.length }}</span>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3">
        <nuxt-link v-for="product in productSearchResult" :key="product.id"
          :to="{ name: 'catalog-product', query: { id: product.id } }" replace>
          <LazyProductCard :product="product" />
        </nuxt-link>
      </div>
    </div>

  </Container>
</template>

<script>
// import('~/assets/css/element-index.scss')

const ProductSearchImport = () => import('~/components/product/SearchInput.vue')
const LazyProductCard = () => import('~/components/product/Card.vue')
const Container = () => import('~/components/Container.vue')

import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  components: {
    ProductSearchImport, LazyProductCard, Container
  },
  computed: {
    ...mapGetters({
      productSearchResult: 'api/products/search/getProducts'
    })
  },
}
</script>

<style>
</style>
