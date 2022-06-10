<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else class="pt-4 md:pt-0 ">
    <div class="py-4">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/catalog' }">Каталог</el-breadcrumb-item>
        <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex flex-col lg:flex-row gap-x-24 pb-3">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4 pb-4">
        <div class="bg-gray-200 rounded-[4px]">
          <div class="flex items-center justify-center py-9 ">
            <client-only v-if="product.images.length > 1">
              <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
                <swiper-slide class="swiper-slide" v-for="image in product.images" :key="image.id">
                  <img :src="image.url" :alt="product.name" class="py-3 h-[300px] mx-auto" />
                </swiper-slide>
              </swiper>
            </client-only>
            <img v-else-if="product.images.length === 1" :src="product.images[0].url"
              class="object-center object-cover h-[300px]" :alt="product.name" />
            <img v-else src="/img/no-finded-image.png" class="object-center object-cover h-[300px]"
              :alt="product.name" />
          </div>
        </div>

        <client-only>
          <swiper class="w-full swiper gallery-thumbs" :options="swiperOptionThumbs" v-if="product.images.length > 1"
            ref="swiperThumbs">
            <swiper-slide v-for="image in product.images" :key="image.id" class="swiper-slide">
              <div class="bg-gray-200 rounded-[4px] flex justify-center">
                <img :src="image.url" :alt="product.name" class="py-3 h-24 max-h-[96px]" />
              </div>
            </swiper-slide>
          </swiper>
        </client-only>

      </div>
      <div class="flex flex-col flex-grow px-2 py-1">
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
        <div class="flex flex-col py-3">
          <div class="flex flex-col md:flex-row justify-between">
            <div v-if="product.actualPrice > 0"
              class="flex flex-col md:flex-row md:items-center gap-y-2.5 md:gap-y-0 md:gap-x-2.5">
              <el-input-number class="text-lg order-1 md:order-none" @change="handleChange" v-model="productSelectCount"
                :min="1" :max="99" />
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
            <div class="flex flex-col justify-center pt-4 md:pt-0 w-full md:w-auto">
              <el-button v-if="product.forSale" type="primary">
                Купить
              </el-button>
              <el-button type="primary" @click="dialogVisible = !dialogVisible">
                Купить
              </el-button>
            </div>
          </div>
        </div>
        <el-collapse accordion class="border px-2.5 rounded-[4px]" v-model="activeCollapseName">
          <el-collapse-item v-if="product.properties.length > 0" title="Характеристики" name="1">
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
          <el-collapse-item v-if="product.machines.length > 0" title="Применяемость" name="2">
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
        <el-dialog :title="`Заказать ${product.name}`" :visible.sync="dialogVisible" width=""
          custom-class="w-[80%] lg:w-1/2">
          <span>Свяжитесь с нашими менеджерами для уточнения цен и наличия.</span>
          <div class="flex gap-x-3">
            <a href="tel:+7(914)043-89-22">+7 (914)-043-89-22 (Валерий)</a>
            <a href="tel:+7(914)043-89-22">+7 (914)-043-89-22 (Андрей)</a>
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
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  auth: false,
  layout: 'index',
  data() {
    return {
      title: '',
      image: '',
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
      activeCollapseName: ['1']
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
      if (value === null || typeof value === 'undefined') {
        this.productSelectCount = 1
      }
      this.calculatePrice = (this.startPrice * this.productSelectCount)
    },
  },
  async fetch() {
    await this.$store.dispatch(
      'products/fetchSingleProduct',
      this.$route.query.id
    )
    this.productSelectCount = 1

    if (this.product.discountPrice) this.startPrice = this.product.discountPrice
    else this.startPrice = this.product.actualPrice

    this.calculatePrice = this.startPrice
  },
  async activated() {
    await this.$fetch()
    if (this.product.images && this.product.images.length > 1) {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$el.swiper
        const swiperThumbs = this.$refs.swiperThumbs.$el.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
      console.log('swipers attached')
    }
  },
}
</script>
