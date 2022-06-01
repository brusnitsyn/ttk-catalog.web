<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <section class="w-full lg:mx-auto lg:max-w-7xl lg:px-4">
      <client-only>
        <swiper
          :options="bannersOptions"
          class="rounded-none lg:rounded-lg h-72 lg:h-[420px]"
        >
          <swiper-slide v-for="banner in banners" :key="banner.id">
            <div
              class="h-full"
              :style="{
                backgroundImage: `url(${banner.image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
              }"
            >
              <div
                class="
                  flex flex-col
                  h-full
                  justify-end
                  items-start
                  px-3.5
                  py-2.5
                  lg:gap-y-4 lg:px-5 lg:py-4
                "
              >
                <span
                  class="
                    font-inter
                    text-xl
                    lg:text-3xl
                    font-bold
                    uppercase
                    text-white
                    md:w-[380px]
                    lg:w-[420px]
                  "
                >
                  {{ banner.header }}
                </span>
                <el-link
                  :href="banner.url"
                  type="primary"
                  class="font-inter text-xl font-bold"
                >
                  ПОДРОБНЕЕ
                </el-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
    </section>
    <Container class="lg:flex lg:flex-col">
      <section v-if="newProducts.length">
        <h1 class="font-inter font-semibold text-lg pb-2 pt-4">Новинки</h1>
        <client-only>
          <swiper :options="swiperOptions">
            <swiper-slide v-for="product in newProducts" :key="product.id">
              <nuxt-link :to="'/products/' + product.id">
                <LazyProductCard :product="product" />
              </nuxt-link>
            </swiper-slide>
          </swiper>
        </client-only>
      </section>
      <section v-if="saleProducts.length">
        <h1 class="font-inter font-semibold text-lg pb-2 pt-4">
          Товары со скидкой
        </h1>
        <client-only>
          <swiper :options="swiperOptions">
            <swiper-slide v-for="product in saleProducts" :key="product.id">
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
      banners: 'banners/getBanners',
      newProducts: 'products/getProductsNew',
      saleProducts: 'products/getProductsSale',
    }),
  },

  async fetch() {
    await this.$store.dispatch('banners/fetchAllBanners')
    await this.$store.dispatch('products/fetchProductsByFilterNew')
    await this.$store.dispatch('products/fetchProductsByFilterSale')
  },
  mounted() {

  },
}
</script>
