<template>
  <button
    v-if="!isOpenMobileMenu"
    @click="setOpenMobileMenu(true)"
    class="fixed right-6 bottom-6 rounded-full p-3 bg-yellow-300 z-50"
  >
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.9444 16.6389H27.9444"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.9444 8.63892H27.9444"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.9444 24.6389H27.9444"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <div
    v-else
    class="
      px-4
      py-5
      rounded-lg
      bg-gray-50
      border border-gray-200
      flex flex-col
      fixed
      bottom-3
      right-3
      left-3
      z-50
    "
  >
    <div class="flex flex-row justify-end">
      <button @click="setOpenMobileMenu(false)" class="p-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          class="text-black"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.0119 6.05566L5.5119 19.5557"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.0119 19.5557L5.5119 6.05566"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="mt-2">
      <ProductSearchInput />
      <div class="flex flex-col gap-y-2.5 font-inter pt-3.5 px-1.5">
        <nuxt-link :to="`/`">Главная</nuxt-link>
        <nuxt-link :to="`/products`">Каталог</nuxt-link>
        <nuxt-link :to="`/info`">О нас</nuxt-link>
        <nuxt-link :to="`/contacts`">Контакты</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isOpenMobileMenu: 'ui/getOpenMobileMenu'
    }),
  },
  methods: {
    setOpenMobileMenu(bool) {
      this.$store.dispatch('ui/setOpenMobileMenu', bool)
    }
  }
}
</script>

<style>
</style>
