<template>
  <!-- <el-skeleton style="width: 240px" :loading="$fetchState.pending" animated>
    <template slot="template">
      <el-skeleton-item variant="image" style="width: 240px; height: 240px;" />
      <div style="padding: 14px;">
        <el-skeleton-item variant="h3" style="width: 50%;" />
        <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;">
          <el-skeleton-item variant="text" style="margin-right: 16px;" />
          <el-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </div>
    </template> -->
    <div class="flex flex-col rounded-lg h-full">
      <div class="
        py-4
        px-6
        lg:py-6 lg:px-8
        flex
        justify-center
        bg-gray-100
        rounded-lg
        select-none
        relative
      ">
        <div class="flex absolute left-1.5 top-1.5" v-if="product.category && product.category.id != 1">
          <div :style="{
            backgroundColor: product.category.color,
          }" class="px-2.5 py-1 rounded-md text-sm">
            {{ product.category.name }}
          </div>
        </div>
        <img v-if="product.images.length > 0" :src="product.images[0].url" alt=""
          class="w-full h-full lg:max-w-[128px] max-h-56 object-cover" />
        <img v-else src="/img/no-finded-image.png" alt=""
          class="w-full h-full lg:max-w-[128px] max-h-56 object-cover" />
      </div>
      <div class="px-2 flex flex-col pt-2 pb-4 gap-y-0.5 justify-between h-full">
        <div class="flex flex-col">
          <span class="text-sm lg:text-base font-inter">{{ product.name }}</span>
          <span class="text-sm lg:text-base font-inter">
            {{ product.article }}
          </span>
        </div>
        <div class="pt-1 flex flex-col" v-if="product.actualPrice > 0">
          <s v-if="product.discountPrice > 0" class="text-[#CE870F] font-inter">
            {{ Number(product.actualPrice).toLocaleString() }} ₽
          </s>
          <span v-if="product.discountPrice > 0" class="text-[#F59E0B] font-bold text-lg font-inter">
            {{ Number(product.discountPrice).toLocaleString() }} ₽
          </span>
          <span v-else class="text-[#F59E0B] font-bold text-lg font-inter">
            {{ Number(product.actualPrice).toLocaleString() }} ₽
          </span>
        </div>
        <div v-else class="pt-1">
          <span class="text-[#F59E0B] text-center text-sm lg:text-base font-inter leading-7 lg:leading-6">
            Стоимость по запросу
          </span>
        </div>
      </div>
    </div>
  </template>
  <!-- </el-skeleton> -->
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
