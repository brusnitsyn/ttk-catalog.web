<template>
  <Container class="flex flex-col">
    <div class="flex flex-row gap-x-4">
      <div class="grow">
        <div class="flex justify-between items-center pb-4">
          <h1 class="text-xl font-semibold font-inter">Корзина</h1>
          <span>Всего товаров: {{ basket.length }}</span>
        </div>
        <div class="bg-gray-50 rounded-[4px] p-4 min-h-max max-h-[580px] overflow-auto overscroll-none">
          <ul class="space-y-4 overflow-auto">
            <li v-for="item in basket" :key="item.id">
              <div class="flex flex-row justify-between">
                <div class="flex gap-x-3.5">
                  <div class="bg-gray-100 p-4 rounded-[4px]">
                    <el-image v-if="item.product.images && item.product.images[0]" fit="cover"
                      :src="item.product.images[0].url" class="w-[98px] h-[98px]" />

                    <el-image v-else fit="cover" src="/img/no-finded-image.png" class="w-[98px] h-[98px]" />
                  </div>
                  <div class="flex flex-col py-0.5">
                    <span class="font-inter">{{ item.product.name }}</span>
                    <span class="font-inter text-sm">Артикул: {{ item.product.article }}</span>
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="flex flex-col">
                    <span>Кол-во:</span>
                    <el-input-number @change="handleChange(item)" :min="1" :max="99" v-model="item.qty" />
                    <span class="text-center font-inter font-medium pt-2">
                      {{ Number(item.price).toLocaleString() }} ₽
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="min-w-[320px] max-w-min">
        <h2 class="text-lg font-semibold font-inter">Оформление заказа</h2>

      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex';
import { deepClone } from '~/helpers';
import ElImage from '~/node_modules/element-ui/lib/image'
import ElInputNumber from '~/node_modules/element-ui/lib/input-number'
export default {
  layout: 'index',
  components: {
    ElImage, ElInputNumber
  },
  computed: {

  },
  data() {
    return {
      basket: []
    }
  },
  async activated() {
    await this.$store.dispatch('basket/getAllProducts')
    this.basket = deepClone(this.$store.state.basket.products)
  },
  methods: {
    handleChange(item) {
      if (item.qty === null || typeof item.qty === 'undefined')
        item.qty = 1

      if(item.product.discountPrice)
        item.price = (item.product.discountPrice * item.qty)
      else
        item.price = (item.product.actualPrice * item.qty)
    },
  }
}
</script>

<style>
</style>
