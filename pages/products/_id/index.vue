<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else>
    <dir class="py-1">
      <button @click="$router.go(-1)" class="cursor-pointer text-black hover:text-orange-400 font-medium">
        <div class="flex items-center gap-x-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0303 4.46967C16.2966 4.73594 16.3208 5.1526 16.1029 5.44621L16.0303 5.53033L9.561 12L16.0303 18.4697C16.2966 18.7359 16.3208 19.1526 16.1029 19.4462L16.0303 19.5303C15.7641 19.7966 15.3474 19.8208 15.0538 19.6029L14.9697 19.5303L7.96967 12.5303C7.7034 12.2641 7.6792 11.8474 7.89705 11.5538L7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z"
              fill="currentColor"
            />
          </svg>

          Назад
        </div>
      </button>
    </dir>
    <div class="flex flex-col lg:flex-row gap-x-24">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4 pb-4">
        <div class="bg-gray-200 rounded-xl">
          <div class="flex items-center justify-center py-9 px-9">
            <img
              :src="image"
              class="object-center object-cover h-full max-h-[300px]"
              loading="lazy"
              :alt="product.name"
            />
          </div>
        </div>
        <swiper class="w-full" :options="productCarouserSwiperOptions">
          <swiper-slide v-for="image in product.carouselImages" :key="image.id">
            <div class="bg-gray-200 rounded-xl flex justify-center">
              <img
                :src="image.url"
                :alt="product.name"
                loading="lazy"
                @click="selectImage(image.url)"
                class="py-3 w-20"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="flex flex-col flex-grow">
        <h1 class="font-inter font-bold text-2xl max-w-lg">
          {{ product.name }}
        </h1>
        <ul class="pt-2 space-y-0.5">
          <li>
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Артикул</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.article }}
              </span>
            </div>
          </li>
          <li v-if="product.originalArticle">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Оригинальный артикул</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.originalArticle }}
              </span>
            </div>
          </li>
          <li>
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Масса</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.weight }} кг.
              </span>
            </div>
          </li>
          <li v-if="product.width > 0">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Ширина</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.width }}
              </span>
            </div>
          </li>
          <li v-if="product.diameter > 0">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Диаметр</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.diameter }}
              </span>
            </div>
          </li>
          <li v-if="product.thickness > 0">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Толщина</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.thickness }}
              </span>
            </div>
          </li>
          <li v-if="product.height > 0">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Высота</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.height }}
              </span>
            </div>
          </li>
          <li v-if="product['length'] > 0">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Длина</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product['length'] }}
              </span>
            </div>
          </li>
          <li v-if="product.hole">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Отверстие</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.hole }}
              </span>
            </div>
          </li>
          <li v-if="product.mountingHole">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Монтажное отверстие</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.mountingHole }}
              </span>
            </div>
          </li>
          <li v-if="product.captureWidth">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Ширина захвата</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.captureWidth }}
              </span>
            </div>
          </li>
          <li v-if="product.thread">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg">Резьба</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.thread }}
              </span>
            </div>
          </li>
          <li v-if="product.distanceBetweenHoles">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-lg"
                >Расстояние между отверстиями</span
              >
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <span class="font-inter text-lg font-semibold">
                {{ product.distanceBetweenHoles }}
              </span>
            </div>
          </li>
          <li v-if="product.machines">
            <div class="flex flex-row justify-between">
              <div class="flex flex-grow items-start">
                <span class="font-inter text-lg">Применяемость</span>
                <div
                  class="flex-grow border-b-2 border-dotted mt-5 mb-1.5 mx-1.5"
                ></div>
              </div>
              <div class="font-inter text-lg font-semibold max-w-[180px]">
                <span v-for="machine in product.machines" :key="machine.id">
                  {{ machine.name }}
                </span>
              </div>
            </div>
          </li>
        </ul>

        <div class="flex flex-row border-t pt-4 mt-4">
          <span class="font-inter font-semibold text-xl">{{ price }}</span>
          <el-input-number
            class="text-lg"
            @change="handleChange"
            v-model="productSelectCount"
            :min="1"
            :max="99"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<style>
.el-input-number__decrease:hover:not(.is-disabled)
  ~ .el-input
  .el-input__inner:not(.is-disabled),
.el-input-number__increase:hover:not(.is-disabled)
  ~ .el-input
  .el-input__inner:not(.is-disabled) {
  border-color: #ea580c;
}

.el-input-number__decrease:hover,
.el-input-number__increase:hover {
  color: #ea580c;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  auth: false,
  layout: 'index',
  data() {
    return {
      image: '',
      productCarouserSwiperOptions: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 16,
      },
      productSelectCount: 1,
      price: 0,
    }
  },
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
    }),
  },
  watch: {
    product: function (value) {
      this.selectImage(value.previewImage)
      this.price = value.actualPrice
    },
  },
  methods: {
    selectImage(image) {
      this.image = image
    },
    handleChange(value) {
      if (this.product.discountPrice <= 0) {
        this.price = this.product.actualPrice * value
      }
    },
  },
  async fetch() {
    await this.$store.dispatch(
      'products/fetchSingleProduct',
      this.$route.params.id
    )
  },
  activated() {
    this.$fetch()
  },
  mounted() {},
  created() {},
}
</script>

