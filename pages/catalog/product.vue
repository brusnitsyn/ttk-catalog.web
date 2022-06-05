<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else class="pt-4 md:pt-0 ">
    <div class="py-4">
      <button @click="$router.go(-1)" class="cursor-pointer text-black hover:text-orange-400 font-medium">
        <div class="flex items-center gap-x-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.0303 4.46967C16.2966 4.73594 16.3208 5.1526 16.1029 5.44621L16.0303 5.53033L9.561 12L16.0303 18.4697C16.2966 18.7359 16.3208 19.1526 16.1029 19.4462L16.0303 19.5303C15.7641 19.7966 15.3474 19.8208 15.0538 19.6029L14.9697 19.5303L7.96967 12.5303C7.7034 12.2641 7.6792 11.8474 7.89705 11.5538L7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z"
              fill="currentColor" />
          </svg>

          Назад
        </div>
      </button>
    </div>
    <div class="flex flex-col lg:flex-row gap-x-24 pb-3">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4 pb-4">
        <div class="bg-gray-200 rounded-xl">
          <div class="flex items-center justify-center py-9 px-9">
            <img :src="image" class="object-center object-cover h-full max-h-[300px]" :alt="product.name" />
          </div>
        </div>
        <client-only>
          <swiper class="w-full" :options="productCarouserSwiperOptions" v-if="product.images.length > 1">
            <swiper-slide v-for="image in product.images" :key="image.id">
              <div class="bg-gray-200 rounded-xl flex justify-center">
                <img :src="image.url" :alt="product.name" loading="lazy" @click="selectImage(image.url)"
                  class="py-3 w-20" />
              </div>
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
      <div class="flex flex-col flex-grow px-2 py-1">
        <div class="flex" v-if="product.category && product.category.id != 1">
          <div :style="{
            backgroundColor: product.category.color,
          }" class="px-4 py-2 rounded-md mb-3">
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
              <el-popover v-else placement="top" width="258" trigger="hover"
                content="Пожалуйста, уточните наличие и стоимость у менеджера.">
                <el-button slot="reference" type="primary" class="w-full">
                  +7 (914)-043-89-22
                </el-button>
              </el-popover>
            </div>
          </div>
        </div>
        <el-collapse accordion class="border px-2.5">
          <el-collapse-item v-if="product.properties.length > 0" title="Характеристики">
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
          <el-collapse-item v-if="product.machines.length > 0" title="Применяемость">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1">
              <span v-for="machine in product.machines" :key="machine.id" class="font-inter">
                {{ machine.name }}
              </span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  auth: false,
  layout: 'index',
  data() {
    return {
      title: '',
      image: '',
      productCarouserSwiperOptions: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 16,
      },
      productSelectCount: 1,
      startPrice: 0,
      calculatePrice: 0,
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
    selectImage(image) {
      this.image = image
    },
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

    if (this.product.images.length > 0)
      this.selectImage(this.product.images[0].url)
    else this.selectImage('/img/no-finded-image.png')
    if (this.product.discountPrice) this.startPrice = this.product.discountPrice
    else this.startPrice = this.product.actualPrice

    this.calculatePrice = this.startPrice
  },
  activated() {
    this.$fetch()
  },
}
</script>
