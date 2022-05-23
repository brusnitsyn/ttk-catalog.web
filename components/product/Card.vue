<template>
  <div class="flex flex-col rounded-lg h-full">
    <div
      class="
        py-4
        px-6
        lg:py-6 lg:px-8
        flex
        justify-center
        bg-gray-100
        rounded-lg
        select-none
      "
    >
      <img :src="product.images[0].url" alt="" srcset="" class="w-full h-full" />
    </div>
    <div class="px-2 flex flex-col pt-2 pb-4 gap-y-0.5 justify-between h-full">
      <div class="flex flex-col">
        <span class="text-sm lg:text-base font-inter">{{ product.name }}</span>
        <span class="text-sm lg:text-base font-inter">{{
          product.article
        }}</span>
      </div>
      <div class="pt-1 flex flex-col">
        <s v-if="product.discountPrice > 0" class="text-orange-400 font-inter"
          >{{ product.actualPrice }} ₽</s
        >
        <span
          v-if="product.discountPrice > 0"
          class="text-orange-600 font-bold text-lg font-inter"
          >{{ product.discountPrice }} ₽</span
        >
        <span v-else class="text-orange-600 font-bold text-lg font-inter"
          >{{ product.actualPrice }} ₽</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {},
  },
}
</script>

<style>
</style>
