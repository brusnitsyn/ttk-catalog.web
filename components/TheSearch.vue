<template>
  <div v-if="isSearchDialogShow"
    class="bg-[#F59E0B] bg-opacity-60 absolute top-0 left-0 right-0 bottom-0 flex flex-col z-50">
    <div class="mx-auto md:max-w-md lg:max-w-lg w-full">
      <div
        class="flex flex-row justify-between py-4 lg:py-6 px-3.5 lg:px-5 shadow-gray-300 drop-shadow-md bg-white rounded-[4px] top-24 relative">
        <span class="font-inter leading-[30px]">Поиск по каталогу</span>
        <button class="p-1.5" @click="switchSearchDialogShow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.60005 3.61424C3.84413 3.37016 4.23985 3.37016 4.48393 3.61424L11.9998 11.1301L19.5156 3.61424C19.7597 3.37016 20.1554 3.37016 20.3995 3.61424C20.6436 3.85832 20.6436 4.25404 20.3995 4.49812L12.8836 12.014L20.3715 19.5019C20.6156 19.746 20.6156 20.1417 20.3715 20.3858C20.1275 20.6299 19.7317 20.6299 19.4877 20.3858L11.9998 12.8979L4.51188 20.3858C4.2678 20.6299 3.87207 20.6299 3.62799 20.3858C3.38392 20.1417 3.38392 19.746 3.62799 19.5019L11.1159 12.014L3.60005 4.49812C3.35597 4.25404 3.35597 3.85832 3.60005 3.61424Z"
              fill="#212121" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isSearchDialogShow: 'ui/getSearchDialogShow'
    })
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isSearchDialogShow ? 'fixed w-full' : ''
      }
    }
  },
  methods: {
    ...mapActions({
      switchSearchDialogShow: 'ui/switchSearchDialogShow'
    })
  },
}
</script>

<style>
</style>
