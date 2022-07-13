<template>
  <div>
        <section class="w-full lg:mx-auto lg:max-w-7xl lg:px-4">
      <client-only>
        <swiper :options="bannersOptions" class="rounded-none lg:rounded-[4px] h-72 lg:h-[420px]">
          <swiper-slide v-for="banner in banners" :key="banner.id">
            <div class="h-full" :style="{
              backgroundImage: `url(${banner.image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }">
              <div class="
                  flex flex-col
                  h-full
                  justify-end
                  items-start
                  px-3.5
                  py-2.5
                  lg:gap-y-4 lg:px-5 lg:py-4
                ">
                <span class="
                    font-inter
                    text-xl
                    lg:text-2xl
                    font-bold
                    uppercase
                    text-white
                    md:w-[380px]
                    lg:w-[420px]
                    pb-2
                    lg:pb-0
                  ">
                  {{ banner.header }}
                </span>
                <a :href="banner.url">
                  <el-button type="primary" size="small">
                    ПОДРОБНЕЕ
                  </el-button>
                </a>
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
            <swiper-slide v-for="product in newProducts" :key="product.id" class="h-full">
              <LazyProductCard :product="product" />
            </swiper-slide>
          </swiper>
        </client-only>
      </section>
      <section v-if="saleProducts.length">
        <h1 class="font-inter font-semibold text-lg pb-2 pt-4">
          Распродажа
        </h1>
        <client-only>
          <swiper :options="swiperOptions">
            <swiper-slide v-for="product in saleProducts" :key="product.id">
             <LazyProductCard :product="product" />
            </swiper-slide>
          </swiper>
        </client-only>
      </section>
    </Container>
  </div>
</template>

<script>
const ElButton = () => import('~/node_modules/element-ui/lib/button')

import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'index',
  components: {
    ElButton
  },
  data() {
    return {
      swiperOptions: {
        watchSlidesVisibility: true,
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
        lazy: true
      },
      bannersOptions: {
        loop: true,
        autoplay: {
          delay: 6500,
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
  fetchOnServer: false,

  mounted() {

  },
}
</script>
