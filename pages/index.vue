<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <section class="w-full lg:mx-auto lg:max-w-7xl lg:px-4">
      <client-only>
        <swiper
          :options="bannersOptions"
          class="rounded-none lg:rounded-lg h-72 lg:h-[420px]"
        >
          <swiper-slide v-for="item in 5" :key="item">
            <div
              class="h-full"
              :style="{
                backgroundImage: `url(
                  http://localhost:3000/img/Group4.jpg
                )`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              text {{ item }}
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
    </section>
    <Container class="lg:flex lg:flex-col">
      <section>
        <h1 class="font-inter font-semibold text-lg pb-2 pt-4">Новинки</h1>
        <client-only>
          <swiper :options="swiperOptions">
            <swiper-slide v-for="product in filteredProducts" :key="product.id">
              <nuxt-link :to="'/products/' + product.id">
                <LazyProductCard :product="product" />
              </nuxt-link>
            </swiper-slide>
          </swiper>
        </client-only>
      </section>
    </Container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'index',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
        },
      },
      bannersOptions: {
        autoplay: {
          delay: 5000,
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      filteredProducts: 'products/getFilteredProducts',
    }),
  },

  async fetch() {
    await this.$store.dispatch('products/fetchAllProducts', '/products')
  },
  mounted() {
    if (!this.products.length) {
      this.$store.dispatch('products/fetchAllProducts', '/products')
    }
  },
}
</script>
