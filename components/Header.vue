<template>
  <div>
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
          <!-- <nuxt-link class="p-1.5 group" :to="{ name: 'auth-login' }" replace>
            <div class="flex flex-row">
              <svg width="20" height="20" class="group-hover:text-primary" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.9565 4.37508H4.44597L3.46249 2.61225C3.3521 2.41438 3.14327 2.29175 2.91669 2.29175H1.66669C1.32151 2.29175 1.04169 2.57157 1.04169 2.91675C1.04169 3.26193 1.32151 3.54175 1.66669 3.54175H2.54969L3.52026 5.28146L5.75866 10.2341L5.76095 10.2392L5.95811 10.6754L3.71074 13.0726C3.54915 13.245 3.49857 13.4937 3.58001 13.7155C3.66145 13.9373 3.861 14.0942 4.09574 14.121L6.14418 14.3551C8.70641 14.648 11.2937 14.648 13.8559 14.3551L15.9043 14.121C16.2473 14.0818 16.4935 13.7721 16.4543 13.4291C16.4151 13.0862 16.1053 12.8399 15.7624 12.8791L13.714 13.1132C11.246 13.3953 8.75403 13.3953 6.28611 13.1132L5.47318 13.0203L7.12266 11.2609C7.13862 11.2439 7.15344 11.2262 7.16712 11.2079L7.79447 11.2896C8.67357 11.404 9.5622 11.4264 10.446 11.3565C12.5072 11.1935 14.4175 10.2127 15.7512 8.63264L16.233 8.06196C16.2491 8.04279 16.2642 8.02267 16.2779 8.0017L17.1757 6.63349C17.8121 5.66369 17.1164 4.37508 15.9565 4.37508ZM7.21358 9.95346C7.07574 9.93552 6.95688 9.84796 6.89884 9.72178L6.89773 9.71934L5.0473 5.62508H15.9565C16.1222 5.62508 16.2216 5.80917 16.1306 5.94771L15.2535 7.28444L14.7961 7.82635C13.6777 9.15124 12.0758 9.97368 10.3474 10.1104C9.55025 10.1734 8.74871 10.1532 7.95575 10.05L7.21358 9.95346Z"
                  fill="currentColor" />
                <path
                  d="M5.41669 15.4167C4.72633 15.4167 4.16669 15.9764 4.16669 16.6667C4.16669 17.3571 4.72633 17.9167 5.41669 17.9167C6.10704 17.9167 6.66669 17.3571 6.66669 16.6667C6.66669 15.9764 6.10704 15.4167 5.41669 15.4167Z"
                  fill="currentColor" />
                <path
                  d="M13.3334 16.6667C13.3334 15.9764 13.893 15.4167 14.5834 15.4167C15.2737 15.4167 15.8334 15.9764 15.8334 16.6667C15.8334 17.3571 15.2737 17.9167 14.5834 17.9167C13.893 17.9167 13.3334 17.3571 13.3334 16.6667Z"
                  fill="currentColor" />
              </svg>
            </div>
          </nuxt-link> -->
        </div>
      </div>
    </Container>
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
