<template>
  <div>
    <button v-if="!isOpenMobileMenu" @click="setOpenMobileMenu"
      class="fixed right-4 bottom-4 rounded-full p-4 bg-[#F59E0B] z-50 shadow-2xl">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.40002 5.39999C2.40002 5.06862 2.66866 4.79999 3.00002 4.79999H21C21.3313 4.79999 21.6 5.06862 21.6 5.39999C21.6 5.73136 21.3313 5.99999 21 5.99999H3.00002C2.66866 5.99999 2.40002 5.73136 2.40002 5.39999ZM2.40002 11.4C2.40002 11.0686 2.66866 10.8 3.00002 10.8H21C21.3313 10.8 21.6 11.0686 21.6 11.4C21.6 11.7314 21.3313 12 21 12H3.00002C2.66866 12 2.40002 11.7314 2.40002 11.4ZM3.00002 16.8C2.66866 16.8 2.40002 17.0687 2.40002 17.4C2.40002 17.7313 2.66866 18 3.00002 18H21C21.3313 18 21.6 17.7313 21.6 17.4C21.6 17.0687 21.3313 16.8 21 16.8H3.00002Z"
          fill="#212121" />
      </svg>
    </button>
    <div v-if="isOpenMobileMenu"
      class="bg-[#F59E0B] bg-opacity-5 backdrop-blur fixed bottom-0 left-0 right-0 top-0 z-30" />

    <transition name="menu">
      <div v-if="isOpenMobileMenu" v-click-outside="outClick"
        class="modal bg-gray-100 border-gray-200 border m-4 p-6 rounded-[4px] bottom-0 right-0 left-0 fixed z-40 font-inter">
        <ProductSearchInput class="mb-4" />
        <ul class="flex flex-col w-full">
          <li class="hover:bg-[#F59E0B] rounded-[4px] px-2">
            <NuxtLink class="py-2 flex flex-row justify-between items-center" :to="'/'">
              <span class="text-[#212121]">Главная</span>
              <!-- <span class="ml-auto text-[#212121]">11</span> -->
            </NuxtLink>
          </li>
          <li class="hover:bg-[#F59E0B] rounded-[4px] px-2">
            <NuxtLink class="py-2 flex flex-row justify-between items-center" :to="'/catalog'">
              <span class="text-[#212121]">Каталог</span>
              <!-- <span class="ml-auto text-gray-400">6</span> -->
            </NuxtLink>
          </li>
        </ul>
        <hr class="mt-2 mb-3 border-gray-200 w-full" />
        <!-- <NuxtLink to="'/auth'" class="w-full text-[#F59E0B] px-2">
          <span>
            Войти
          </span>
        </NuxtLink>
        <hr class="mt-3 mb-2 border-gray-200 w-full" /> -->
        <div class="flex flex-row justify-between">
          <button class="px-2 py-2" @click="setOpenMobileMenu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.60005 3.61424C3.84413 3.37016 4.23985 3.37016 4.48393 3.61424L11.9998 11.1301L19.5156 3.61424C19.7597 3.37016 20.1554 3.37016 20.3995 3.61424C20.6436 3.85832 20.6436 4.25404 20.3995 4.49812L12.8836 12.014L20.3715 19.5019C20.6156 19.746 20.6156 20.1417 20.3715 20.3858C20.1275 20.6299 19.7317 20.6299 19.4877 20.3858L11.9998 12.8979L4.51188 20.3858C4.2678 20.6299 3.87207 20.6299 3.62799 20.3858C3.38392 20.1417 3.38392 19.746 3.62799 19.5019L11.1159 12.014L3.60005 4.49812C3.35597 4.25404 3.35597 3.85832 3.60005 3.61424Z"
                fill="#212121" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      outClick: {
        handler: this.setOpenMobileMenu,
        events: ['click'],
        middleware: this.middleware,
      }
    }
  },
  computed: {
    ...mapGetters({
      isOpenMobileMenu: 'ui/getMobileMenuShow'
    }),
  },
  methods: {
    ...mapActions({
      setOpenMobileMenu: 'ui/switchMobileMenuShow'
    }),
    middleware(event) {
      return event.target.className !== 'modal'
    }
  },
  watch: {
    isOpenMobileMenu() {
      if (this.isOpenMobileMenu) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.removeAttribute('style')
    },
  }
}
</script>

<style>
.modal-hidden {
  transition: all 0.35s ease;
}

.menu-enter-active {
  transition: all 0.3s ease;
}

.menu-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter,
.menu-leave-active {
  transform: translateY(344px);
  opacity: 0;
}
</style>
