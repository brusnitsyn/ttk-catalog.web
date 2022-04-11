<template>
  <div class="flex flex-col max-w-[172px] lg:max-w-[192px]">
    <div class="py-4 lg:py-6 flex justify-center bg-gray-200 rounded-lg">
      <img src="/img/product-test-img.png" alt="" srcset="" />
    </div>
    <div class="px-3.5 flex flex-col pt-2 pb-4 gap-y-0.5">
      <span class="text-md">Блок-шестерня кпп мб агро</span>
      <span class="text-md">42Т.001.01.01.018</span>
      <div class="pt-1">
        <s v-show="product.isSale" class="text-yellow-400">360 ₽</s>
        <span class="text-orange-600 font-bold text-lg">340 ₽</span>
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
