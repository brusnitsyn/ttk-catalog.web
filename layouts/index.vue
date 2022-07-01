<template>
  <div>
    <Header class="hidden md:block sticky top-0 w-full bg-white bg-opacity-50 backdrop-blur-lg z-50" />
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['ProductPage'] }" class="min-h-screen" />
    <Footer />
    <MobileMenu class="md:hidden" />
    <Search />
  </div>
</template>

<script>
const MobileMenu = () => import('~/components/MobileMenu.vue')
const Search = () => import('~/components/TheSearch.vue')
export default {
  components: {
    MobileMenu, Search
  }
}
</script>
