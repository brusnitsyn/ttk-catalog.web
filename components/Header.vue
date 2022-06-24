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
        <div class="hidden md:flex flex-row gap-x-6 font-inter">
          <nuxt-link to="/">
            <LogoShort />
          </nuxt-link>
          <div class="flex gap-x-4">
            <nuxt-link :to="`/`">Главная</nuxt-link>
            <nuxt-link :to="`/catalog`">Каталог</nuxt-link>
          </div>
        </div>

        <div class="hidden md:flex flex-row gap-x-4 font-inter">
          <button class="p-1.5 group" @click="handleOpenSearch">
            <svg width="19" height="19" class="group-hover:text-[#F59E0B]" viewBox="0 0 19 19"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9.05608 1.72754C13.0836 1.72754 16.3596 5.00354 16.3596 9.03104C16.3596 10.9312 15.6304 12.6642 14.4371 13.9649L16.7851 16.3081C17.0049 16.5278 17.0056 16.8833 16.7859 17.1031C16.6764 17.2141 16.5316 17.2688 16.3876 17.2688C16.2444 17.2688 16.1004 17.2141 15.9901 17.1046L13.6137 14.7348C12.3636 15.7359 10.7786 16.3353 9.05608 16.3353C5.02858 16.3353 1.75183 13.0585 1.75183 9.03104C1.75183 5.00354 5.02858 1.72754 9.05608 1.72754ZM9.05608 2.85254C5.64883 2.85254 2.87683 5.62379 2.87683 9.03104C2.87683 12.4383 5.64883 15.2103 9.05608 15.2103C12.4626 15.2103 15.2346 12.4383 15.2346 9.03104C15.2346 5.62379 12.4626 2.85254 9.05608 2.85254Z"
                fill="currentColor" />
            </svg>
          </button>
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
