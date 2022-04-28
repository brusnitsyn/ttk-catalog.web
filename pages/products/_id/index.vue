<template>
  <Container>
    <dir class="py-1">
      <a @click="$router.go(-1)" class=""> Назад </a>
    </dir>
    <div class="flex flex-col lg:flex-row gap-x-24">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4">
        <div class="bg-gray-200 rounded-xl max-h-[448px]">
          <div class="flex items-center justify-center py-9 px-9">
            <img
              :src="`http://localhost:8000/storage/${product.previewImage}`"
              class="w-full h-full"
              loading="lazy"
              :alt="product.name"
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4">
          <div
            v-for="image in product.carouselImages"
            :key="image.id"
            class="bg-gray-200 rounded-xl flex justify-center"
          >
            <img
              :src="`http://localhost:8000/storage/${image.url}`"
              :alt="product.name"
              loading="lazy"
              class="py-3 w-20"
            />
          </div>
          <!-- <div class="bg-gray-200 rounded-xl flex justify-center">
            <img :src="product.image" :alt="product.name" loading="lazy" class="py-3 w-20" />
          </div>
          <div class="bg-gray-200 rounded-xl flex justify-center">
            <img :src="product.image" :alt="product.name" loading="lazy" class="py-3 w-20" />
          </div> -->
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="font-inter font-semibold text-2xl max-w-lg">
          {{ product.name }}
        </h1>
        <ul>
          <li>Артикул: {{ product.article }}</li>
          <li>Масса: {{ product.weight }} кг.</li>
          <li>Диаметр: {{ product.height }}</li>
          <li>Толщина: {{ product.article }}</li>
          <li>Артикул: {{ product.article }}</li>
        </ul>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  auth: false,
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

