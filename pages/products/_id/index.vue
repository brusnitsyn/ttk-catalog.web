<template>
  <Loading v-if="$fetchState.pending" />
  <Container v-else>
    <dir class="py-1">
      <button @click="$router.go(-1)" class="cursor-pointer">Назад</button>
    </dir>
    <div class="flex flex-col lg:flex-row gap-x-24">
      <div class="flex flex-col grow-0 max-w-md w-full gap-y-4 pb-4">
        <div class="bg-gray-200 rounded-xl max-h-[448px]">
          <div class="flex items-center justify-center py-9 px-9 lg:h-[376px]">
            <img
              :src="image"
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
              :src="image.url"
              :alt="product.name"
              loading="lazy"
              @click="selectImage(image.url)"
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
      image: '',
    }
  },
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
    }),
  },
  watch: {
    product: function(value) {
      this.selectImage(value.previewImage)
    }
  },
  methods: {
    selectImage(image) {
      this.image = image
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
  mounted() {

  },
  created() {

  },
}
</script>

<style>
</style>

