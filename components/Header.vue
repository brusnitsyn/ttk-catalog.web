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
          <div class="flex gap-x-4 items-center">
            <nuxt-link class="font-inter leading-4" to="/" replace>Главная</nuxt-link>
            <nuxt-link class="font-inter leading-4" to="/catalog" replace>Каталог</nuxt-link>
          </div>
        </div>

        <div class="hidden md:flex flex-row gap-x-4 font-inter">
          <button class="p-1.5 group" @click="handleOpenSearch">
            <svg width="20" height="20" class="group-hover:text-[#F59E0B]" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.00494 14.928C12.4481 14.928 15.2393 12.1368 15.2393 8.6936C15.2393 5.25045 12.4481 2.45923 9.00494 2.45923C5.56179 2.45923 2.77057 5.25045 2.77057 8.6936C2.77057 12.1368 5.56179 14.928 9.00494 14.928Z"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.4136 13.1021L17.0206 16.7091" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <!-- <nuxt-link class="p-1.5 group" :to="{ name: 'auth-login' }" replace>
            <svg width="20" height="20" class="group-hover:text-[#F59E0B]" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.2465 12.5881C12.8699 12.5881 14.9965 10.4615 14.9965 7.83813C14.9965 5.21478 12.8699 3.08813 10.2465 3.08813C7.62317 3.08813 5.49652 5.21478 5.49652 7.83813C5.49652 10.4615 7.62317 12.5881 10.2465 12.5881Z"
                stroke="currentColor" stroke-miterlimit="10" />
              <path
                d="M3.0473 16.7443C3.77683 15.4805 4.8262 14.431 6.08994 13.7013C7.35368 12.9716 8.78724 12.5874 10.2465 12.5874C11.7058 12.5874 13.1394 12.9716 14.4031 13.7013C15.6668 14.431 16.7162 15.4805 17.4457 16.7443"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </nuxt-link> -->
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      handleOpenSearch: 'ui/switchSearchDialogShow'
    })
  }
}
</script>
