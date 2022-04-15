<template>
  <Container>
    <div class="flex flex-col lg:flex-row gap-x-24">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4">
        <div class="bg-gray-200 rounded-xl">
          <div class="flex items-center justify-center py-9">
            <img src="/img/product-full-test-img.png" loading="lazy" :alt="product.name" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4">
          <div class="bg-gray-200 rounded-xl flex justify-center">
            <img :src="product.image" :alt="product.name" loading="lazy" class="py-3 w-20" />
          </div>
          <div class="bg-gray-200 rounded-xl flex justify-center">
            <img :src="product.image" :alt="product.name" loading="lazy" class="py-3 w-20" />
          </div>
          <div class="bg-gray-200 rounded-xl flex justify-center">
            <img :src="product.image" :alt="product.name" loading="lazy" class="py-3 w-20" />
          </div>
        </div>
      </div>
      <div>
        <h1 class="font-inter font-semibold text-xl grow">
          {{ product.name }}
        </h1>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
    }),
  },
  async fetch() {
    await this.$store.dispatch(
      'products/fetchSingleProduct',
      this.$route.params.id
    )
  },
  mounted() {},
}
</script>

<style>
</style>

