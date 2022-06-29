<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <Container class="pt-4 md:pt-0 ">
    <div class="py-4">
      <el-skeleton :loading="$fetchState.pending" animated>
        <template slot="template">
          <el-skeleton-item variant="caption" style="max-width: 372px; width: 100%" />
        </template>
        <template>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'catalog' }">Каталог</el-breadcrumb-item>
            <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-skeleton>
    </div>

    <div class="flex flex-col lg:flex-row gap-x-24 pb-3">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4 pb-4">
        <div class="bg-gray-200 rounded-[4px]">
          <el-skeleton v-if="$fetchState.pending" style="width: 100%; height: 100%;" animated>
            <template slot="template">
              <el-skeleton-item variant="image" style="width: 100%; height: 300px; " />
            </template>
          </el-skeleton>
          <div v-else class="flex items-center justify-center py-9">
            <Swiper v-if="product.images && product.images.length >= 2" class="swiper gallery-top"
              :options="swiperOptionTop" ref="swiperTop">
              <SwiperSlide class="swiper-slide flex items-center justify-center" v-for="image in product.images"
                :key="image.id">
                <el-image :src="image.url" :preview-src-list="srcImgs" fit="cover" class="h-[300px]"
                  :alt="product.name" lazy />
              </SwiperSlide>
            </Swiper>

            <el-image v-else-if="product.images && product.images.length === 1" :src="product.images[0].url"
              class="object-center object-cover h-[300px]" fit="cover" :preview-src-list="[product.images[0].url]"
              :alt="product.name" lazy/>
            <el-image v-else src="/img/no-finded-image.png" class="object-center object-cover h-[300px]"
              :alt="product.name" lazy />
          </div>
        </div>

        <el-skeleton v-if="$fetchState.pending" style="width: 100%" animated>
          <template slot="template">
            <div style="display: inline-flex; width: 100%;">
              <el-skeleton-item variant="image" style="width: 32%; height: 96px;" />
              <el-skeleton-item variant="image"
                style="width: 32%; height: 96px; margin-left: 10px; margin-right: 10px;" />
              <el-skeleton-item variant="image" style="width: 32%; height: 96px;" />
            </div>
          </template>
        </el-skeleton>
        <client-only v-else-if="product.images && product.images.length >= 2">
          <Swiper class="w-full swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
            <SwiperSlide v-for="image in product.images" :key="image.id" class="swiper-slide">
              <div class="bg-gray-200 rounded-[4px] flex justify-center">
                <img :src="image.url" :alt="product.name" class="py-3 h-24 max-h-[96px]" />
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>

      <div class="flex flex-col flex-grow px-2 py-1">
        <el-skeleton v-if="$fetchState.pending" style="width: 100%" animated>
          <template slot="template">
            <el-skeleton-item variant="rect" style="width: 97px; height: 40px;" />
            <div style="margin-top: 8px; display: flex; flex-direction: column;">
              <el-skeleton-item variant="h1" style="width: 160px; height: 20px;" />
              <el-skeleton-item variant="text" style="width: 130px; height: 20px; margin-top: 2px;" />
            </div>
          </template>
        </el-skeleton>
        <div v-else>
          <div class="flex" v-if="product.category && product.category.id != 1">
            <div :style="{
              backgroundColor: product.category.color,
            }" class="px-4 py-2 rounded-[4px] mb-3">
              {{ product.category.name }}
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <h1 class="font-inter font-bold text-2xl max-w-lg">
                {{ product.name }}
              </h1>
              <span class="font-inter text-gray-400 text-sm">
                Артикул: {{ product.article }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col py-3">
          <div class="flex flex-col md:block">
            <el-skeleton v-if="$fetchState.pending" style="width: 100%" animated>
              <template slot="template">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center;">
                    <el-skeleton-item variant="rect" style="width: 120px; height: 40px; margin-right: 8px;" />
                    <el-skeleton-item variant="h1" style="width: 160px; height: 20px;" />
                  </div>
                </div>
              </template>
            </el-skeleton>
            <div v-else class="flex flex-col md:flex-row justify-between">
              <div v-if="product.actualPrice > 0"
                class="flex flex-col md:flex-row md:items-center gap-y-2.5 md:gap-y-0 md:gap-x-2.5">
                <el-input-number class="text-lg order-1 md:order-none" @change="handleChange"
                  v-model="productSelectCount" :min="1" :max="99" />
                <div class="flex flex-col items-start">
                  <s v-if="product.discountPrice" class="font-inter text-sm leading-4">
                    {{ Number(product.actualPrice).toLocaleString() }} ₽
                  </s>
                  <div class="flex flex-row">
                    <span class="font-inter text-lg">{{ Number(calculatePrice).toLocaleString() }} ₽</span>
                    <span class="font-inter text-sm text-gray-500 pl-1.5 leading-7">
                      без НДС / за {{ productSelectCount }} шт.
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col md:flex-row md:items-center gap-y-2.5 md:gap-y-0 md:gap-x-2.5">
                <span class="font-inter text-sm leading-4">
                  Стоимость по запросу
                </span>
              </div>
              <div class="pt-4 md:pt-0 w-full md:w-auto">
                <el-button v-if="product.forSale" type="primary" class="md:w-[160px]">
                  Купить
                </el-button>
                <el-button type="primary" @click="dialogVisible = !dialogVisible" class="w-full md:w-[160px]">
                  Купить
                </el-button>
              </div>
            </div>

          </div>
        </div>
        <el-skeleton style="width: 100%; height: 100%;" :loading="$fetchState.pending" animated>
          <template slot="template">
            <el-skeleton-item variant="rect" style="width: 100%; height: 420px;" />
          </template>
          <template>
            <el-collapse accordion class="border px-2.5 rounded-[4px]" v-model="activeCollapseName">
              <el-collapse-item v-if="product.properties && product.properties.length > 0" title="Характеристики"
                name="1">
                <ol class="space-y-2 md:space-y-0.5">
                  <li v-for="prop in product.properties" :key="prop.id">
                    <div class="flex flex-col md:flex-row justify-between items-baseline">
                      <span class="leading-3 font-inter text-sm">{{ prop.property.name }}</span>
                      <div
                        class="hidden md:block md:flex-grow border-b-2 min-w-[50px] border-dotted border-gray-400 mb-1.5 mx-1.5">
                      </div>
                      <div class="flex-initial gap-x-1 text-sm">
                        <span class="font-inter font-semibold">
                          {{ prop.value }}
                        </span>
                        <span v-if="prop.isDimension" class="font-inter font-semibold">
                          {{ prop.dimension }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ol>
              </el-collapse-item>
              <el-collapse-item v-if="product.machines && product.machines.length > 0" title="Применяемость" name="2">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1">
                  <span v-for="machine in product.machines" :key="machine.id" class="font-inter">
                    {{ machine.name }}
                  </span>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="product.description" title="Описание" name="3">
                <span class="font-inter">
                  {{ product.description }}
                </span>
              </el-collapse-item>
            </el-collapse>
          </template>
        </el-skeleton>
        <el-dialog :title="`Купить ${product.name}`" :visible.sync="dialogVisible"
          custom-class="max-w-none md:max-w-md">
          <div>
            <p class="break-words">Свяжитесь с менеджерами для уточнения наличия</p>
            <div class="flex flex-col md:flex-row gap-x-3 gap-y-1 items-start pt-2">
              <el-link href="tel:+7(914)043-89-22">+7 (914)-043-89-22 (Валерий)</el-link>
              <el-link href="tel:+7(914)043-89-22">+7 (914)-043-89-22 (Андрей)</el-link>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped>
::v-deep .swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  &.gallery-top {
    height: 80%;
    width: 100%;
  }

  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 0;
  }

  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}

::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #FFFFFF;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  width: 100%;
}
</style>

<script>
import('~/assets/css/element-index.scss')
import 'swiper/css/swiper.css'

const ElButton = () => import('~/node_modules/element-ui/lib/button')
const ElInputNumber = () => import('~/node_modules/element-ui/lib/input-number')
const ElBreadcrumb = () => import('~/node_modules/element-ui/lib/breadcrumb')
const ElBreadcrumbItem = () => import('~/node_modules/element-ui/lib/breadcrumb-item')
const ElCollapse = () => import('~/node_modules/element-ui/lib/collapse')
const ElCollapseItem = () => import('~/node_modules/element-ui/lib/collapse-item')
const ElDialog = () => import('~/node_modules/element-ui/lib/dialog')
const ElImage = () => import('~/node_modules/element-ui/lib/image')
const ElLink = () => import('~/node_modules/element-ui/lib/link')
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import { mapGetters } from 'vuex'
export default {
  auth: false,
  layout: 'index',
  components: {
    ElButton, ElInputNumber, ElBreadcrumb,
    ElBreadcrumbItem, ElCollapse, ElCollapseItem,
    ElDialog, ElLink, Swiper,
    SwiperSlide, ElImage
  },
  watch: {
    product(value) {
      if (!value.images)
        return
      if (value.images.length == 0)
        return
      if (value.images.length >= 2) {
        value.images.forEach(img => {
          this.srcImgs.push(img.url)
        })
      } else {
        this.srcImgs.push(value.images[0].url)
      }

    }
  },
  data() {
    return {
      dialogVisible: false,
      swiperOptionTop: {
        lazy: true,
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        centeredSlides: true,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        lazy: true,
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      productSelectCount: 1,
      startPrice: 0,
      calculatePrice: 0,
      activeCollapseName: ['1'],
      srcImgs: [],
    }
  },
  head() {
    return {
      title: `${this.product.name} | Компания ТТК+`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Купить ${this.product.name} ${this.product.article} по самой низкой цене в интернет-магазине запчастей ТТК+`,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
    }),
  },
  methods: {
    handleChange(value) {
      if (value === null || typeof value === 'undefined')
        this.productSelectCount = 1

      this.calculatePrice = (this.startPrice * this.productSelectCount)
    },
  },
  async fetch() {
    const { store, query } = this.$nuxt.context
    await store.dispatch(
      'products/fetchSingleProduct',
      query.id
    )
    this.productSelectCount = 1

    if (this.product.discountPrice) this.startPrice = this.product.discountPrice
    else this.startPrice = this.product.actualPrice

    this.calculatePrice = this.startPrice
  },
  updated() {
    if (this.product.images && this.product.images.length >= 2)
      try {
        const swiperTop = this.$refs.swiperTop.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper

        this.$refs.swiperTop.$swiper.controller.control = swiperThumbs
        this.$refs.swiperThumbs.$swiper.controller.control = swiperTop
      } catch { }
  },
}
</script>
