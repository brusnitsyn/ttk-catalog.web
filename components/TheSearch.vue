<template>
  <div v-if="isSearchDialogShow"
    class="bg-[#F59E0B] bg-opacity-60 backdrop-blur-md fixed top-0 left-0 right-0 bottom-0 flex flex-col z-50">
    <div class="mx-auto md:max-w-md lg:max-w-lg w-full lg:max-h-[612px] top-14 relative">
      <div
        class="flex flex-col justify-between py-4 lg:py-6 px-3.5 lg:px-5 shadow-gray-300 drop-shadow-md bg-white rounded-[4px] ">
        <div class="flex flex-row justify-between">
          <span class="font-inter leading-[30px]">Поиск по каталогу</span>
          <button class="p-1.5" @click="switchSearchDialogShow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.60005 3.61424C3.84413 3.37016 4.23985 3.37016 4.48393 3.61424L11.9998 11.1301L19.5156 3.61424C19.7597 3.37016 20.1554 3.37016 20.3995 3.61424C20.6436 3.85832 20.6436 4.25404 20.3995 4.49812L12.8836 12.014L20.3715 19.5019C20.6156 19.746 20.6156 20.1417 20.3715 20.3858C20.1275 20.6299 19.7317 20.6299 19.4877 20.3858L11.9998 12.8979L4.51188 20.3858C4.2678 20.6299 3.87207 20.6299 3.62799 20.3858C3.38392 20.1417 3.38392 19.746 3.62799 19.5019L11.1159 12.014L3.60005 4.49812C3.35597 4.25404 3.35597 3.85832 3.60005 3.61424Z"
                fill="#212121" />
            </svg>
          </button>
        </div>
        <div class="py-3 flex flex-col">
          <ProductSearchInput />
          <ol v-if="productSearchResult.length > 0"
            class="mt-2.5 rounded-[4px] border p-1.5 space-y-2.5 overflow-y-auto max-h-[512px]">
            <li class="rounded-[4px] hover:bg-gray-100 p-1.5 px-2 pr-4 cursor-pointer"
              v-for="product in productSearchResult" :key="product.id">
              <NuxtLink :to="{ path: '/catalog/product', query: { id: product.id } }" replace
                class="flex flex-row items-center gap-x-2">
                <img v-if="product.images.length" :src="product.images[0].url" class="h-14 rounded-[4px]" />
                <div class="flex flex-col font-inter">
                  <span class="truncate max-w-[240px]">
                    {{ product.name }}
                  </span>
                  <span class="text-gray-400 text-sm">
                    Артикул: {{ product.article }}
                  </span>
                </div>
              </NuxtLink>
            </li>
          </ol>
        </div>
        <div v-if="productSearchResult.length > 0" class="flex justify-end">
          <Nuxt-Link :to="'/catalog/search'" replace class="text-sm">
            Все результаты
          </Nuxt-Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ProductSearchInput = () => import('~/components/product/SearchInput')
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ProductSearchInput
  },
  computed: {
    ...mapGetters({
      isSearchDialogShow: 'ui/getSearchDialogShow',
      productSearchResult: 'api/products/search/getProducts',
    })
  },
  methods: {
    ...mapActions({
      switchSearchDialogShow: 'ui/switchSearchDialogShow',
      fetchProductsBySearchQuery: 'api/products/search/fetchProductBySearchQuery'
    })
  },
  watch: {
    isSearchDialogShow() {
      if (this.isSearchDialogShow) {
        console.log(window.scrollY)
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        return
      }
      const top = document.body.style.top
      document.body.removeAttribute('style')
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
  },
  deactivated() {
    this.$store.commit('api/products/search/clearProducts')
  }
}
</script>

<style>
</style>
