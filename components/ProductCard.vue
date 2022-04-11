<template>
  <div class="flex flex-col">
    <div class="py-4 px-6 lg:py-6 lg:px-8 flex justify-center bg-gray-200 rounded-lg select-none">
      <img src="/img/product-test-img.png" alt="" srcset="" />
    </div>
    <div class="px-2 flex flex-col pt-2 pb-4 gap-y-0.5">
      <span class="text-sm lg:text-base font-inter">Блок-шестерня кпп мб агро</span>
      <span class="text-sm lg:text-base font-inter">42Т.001.01.01.018</span>
      <div class="pt-1">
        <s v-show="product.isSale" class="text-yellow-400">360 ₽</s>
        <span class="text-orange-600 font-bold text-lg font-inter">340 ₽</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        isSale: false,
      },
    }
  },
}
</script>

<style>
</style>
