<template>
  <!-- <div>
    <Container>
      <div class="
          flex
          justify-between
          items-center
          gap-x-4
          py-4
          lg:py-6 lg:gap-x-6
        ">
        <div class="hidden md:flex flex-row gap-x-8 font-inter">
          <nuxt-link to="/">
            <LogoShort />
          </nuxt-link>
          <div class="flex gap-x-6 items-center">
            <nuxt-link class="font-inter leading-4" to="/" replace>Главная</nuxt-link>
            <nuxt-link class="font-inter leading-4" to="/catalog" replace>Каталог</nuxt-link>
          </div>
        </div>

        <div class="flex flex-row gap-x-4 font-inter">
          <button class="p-1.5 group" @click="handleOpenSearch">
            <svg width="20" height="20" class="group-hover:text-primary" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.00494 14.928C12.4481 14.928 15.2393 12.1368 15.2393 8.6936C15.2393 5.25045 12.4481 2.45923 9.00494 2.45923C5.56179 2.45923 2.77057 5.25045 2.77057 8.6936C2.77057 12.1368 5.56179 14.928 9.00494 14.928Z"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.4136 13.1021L17.0206 16.7091" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <div class="group p-1.5 relative">
            <nuxt-link class="" :to="{ name: 'auth-login' }" replace>
              <svg width="20" height="20" class="group-hover:text-primary" viewBox="0 0 20 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.2465 12.5881C12.8699 12.5881 14.9965 10.4615 14.9965 7.83813C14.9965 5.21478 12.8699 3.08813 10.2465 3.08813C7.62317 3.08813 5.49652 5.21478 5.49652 7.83813C5.49652 10.4615 7.62317 12.5881 10.2465 12.5881Z"
                  stroke="currentColor" stroke-miterlimit="10" />
                <path
                  d="M3.0473 16.7443C3.77683 15.4805 4.8262 14.431 6.08994 13.7013C7.35368 12.9716 8.78724 12.5874 10.2465 12.5874C11.7058 12.5874 13.1394 12.9716 14.4031 13.7013C15.6668 14.431 16.7162 15.4805 17.4457 16.7443"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </nuxt-link>
            <div
              class="max-h-max absolute -top-5 -right-5 w-[600px] origin-[98%_5%] duration-300 ease-in-out opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div> -->
  <div class="bg-[#FFFBFE]/95 lg:backdrop-blur-md lg:sticky lg:top-0 z-50 ">
    <div class="flex flex-row lg:justify-between items-center lg:max-w-7xl lg:mx-auto">
      <div class="w-full">
        <div class="flex flex-row px-4 py-2.5 gap-x-8">
          <nuxt-link :to="{ name: 'index' }" class="hidden lg:block">
            <LogoShort />
          </nuxt-link>
          <ProductSearchInput class="lg:max-w-[420px]" />
        </div>
      </div>

      <div
        class="fixed bottom-0 left-0 right-0 lg:sticky lg:top-0 bg-[#FFFBFE]/95 lg:bg-transparent z-50 lg:py-4 shadow-[0_3px_10px_0px_rgba(0,0,0,.15)] lg:shadow-none backdrop-blur-md lg:backdrop-blur-none">
        <nav class="flex justify-between items-center w-full lg:px-4">
          <div class="w-full">
            <ul
              class="flex flex-row justify-around lg:justify-start lg:items-center p-2.5 lg:p-0 text-xs lg:text-sm lg:gap-x-6 lg:ml-6 font-inter items-stretch"
              ref="menu">

              <li>
                <nuxt-link :to="{ name: 'index' }" class="flex flex-col lg:flex-row items-center" exact>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="lg:hidden">
                    <path
                      d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"
                      fill="currentColor">
                    </path>
                  </svg>
                  <span class="mt-1 lg:mt-0">Главная</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link :to="{ name: 'catalog' }" class="flex flex-col lg:flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="lg:hidden">
                    <path
                      d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm5 2h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm1-6h4v4h-4V5zM3 20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6zm2-5h4v4H5v-4zm8 5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6zm2-5h4v4h-4v-4z"
                      fill="currentColor">
                    </path>
                  </svg>
                  <span class="mt-1 lg:mt-0">Каталог</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link :to="{ name: 'catalog' }" class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                      d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"
                      fill="currentColor">
                    </path>
                    <path d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z" fill="currentColor"></path>
                  </svg>
                  <span class="mt-1 lg:mt-0">Статьи</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link :to="{ name: 'basket' }" class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                      d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"
                      fill="currentColor"></path>
                  </svg>
                  <span class="mt-1 lg:mt-0">Корзина</span>
                </nuxt-link>
              </li>

              <li class="group relative">
                <nuxt-link :to="{ name: 'auth-login' }" class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                      d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"
                      fill="currentColor">
                    </path>
                    <path
                      d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"
                      fill="currentColor">
                    </path>
                  </svg>
                  <span class="mt-1 lg:mt-0">Кабинет</span>
                </nuxt-link>
                <div
                  class="max-h-max absolute -top-0 -right-0 w-[600px] origin-[98%_5%] duration-300 ease-in-out opacity-0 group-hover:lg:opacity-100 scale-0 group-hover:lg:scale-100">
                  <UserMenu />
                </div>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserMenu from './main/UserMenu.vue'
export default {
  methods: {
    ...mapActions({
      handleOpenSearch: "ui/switchSearchDialogShow"
    })
  },
  components: { UserMenu }
}
</script>
