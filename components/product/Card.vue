<template>
  <div class="flex flex-col rounded-[4px] h-full">
    <nuxt-link :to="{ name: 'catalog-product-id', params: { id: product.id } }" class="cursor-pointer">
      <div class="
        py-4
        px-6
        lg:py-6 lg:px-8
        flex
        justify-center
        bg-gray-100
        rounded-[4px]
        select-none
        relative
      ">
        <div class="flex absolute left-1.5 top-1.5" v-if="product.category && product.category.id != 1">
          <div :style="{
            backgroundColor: product.category.color,
          }" class="px-2.5 py-1 rounded-[4px] text-sm">
            {{ product.category.name }}
          </div>
        </div>
        <el-image v-if="product.images.length > 0" :src="product.images[0].url" alt=""
          class="w-full h-full lg:max-w-[128px] max-h-56 object-cover">
        </el-image>
        <el-image v-else src="/img/no-finded-image.png" alt=""
          class="w-full h-full lg:max-w-[128px] max-h-56 object-cover">
        </el-image>
      </div>
    </nuxt-link>
    <div class="px-2 flex flex-col pt-2 pb-4 gap-y-0.5 justify-between h-full">
      <nuxt-link :to="{ name: 'catalog-product-id', params: { id: product.id } }" class="cursor-pointer">
      <div class="flex flex-col gap-y-1">
          <span class="text-sm lg:text-base font-inter lg:leading-3">{{ product.name }}</span>
          <span class="text-sm lg:text-base font-inter">
            {{ product.article }}
          </span>
      </div>
      </nuxt-link>
      <div v-if="product.actualPrice > 0" class="flex justify-between items-end">
        <div class="pt-1 flex flex-col">
          <s v-if="product.discountPrice > 0" class="text-primary font-inter">
            {{ Number(product.actualPrice).toLocaleString() }} ₽
          </s>
          <span v-if="product.discountPrice > 0" class="text-primary font-bold text-lg font-inter">
            {{ Number(product.discountPrice).toLocaleString() }} ₽
          </span>
          <span v-else class="text-primary font-bold text-lg font-inter">
            {{ Number(product.actualPrice).toLocaleString() }} ₽
          </span>
        </div>
        <el-button v-if="product.discountPrice > 0" type="primary" size="small" plain
          @click="addProductToBasket({ product: product, qty: 1, price: product.discountPrice })">
          В корзину
        </el-button>
        <el-button v-else type="primary" size="small" plain
          @click="addProductToBasket({ product: product, qty: 1, price: product.actualPrice })">
          В корзину
        </el-button>
      </div>
      <div v-else class="pt-1">
        <span class="text-primary text-center text-sm lg:text-base font-inter leading-7 lg:leading-6">
          Стоимость по запросу
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const ElImage = () => import('~/node_modules/element-ui/lib/image')
const ElButton = () => import('~/node_modules/element-ui/lib/button')
export default {
  components: {
    ElImage, ElButton
  },
  props: {
    product: {},
  },
  methods: {
    ...mapActions({
      addProductToBasket: 'basket/addProduct'
    })
  }
}
</script>

<style>
</style>
