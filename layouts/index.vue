<template>
  <main>
    <AppHeader />
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['ProductPage'] }" class="min-h-screen" />
    <Footer class="mb-[68px] lg:mb-0"/>
    <!-- <MobileMenu class="md:hidden" /> -->
    <Search />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
const MobileMenu = () => import('@/components/MobileMenu.vue')
const Search = () => import('@/components/TheSearch.vue')
export default {
  components: {
    AppHeader, MobileMenu, Search
  }
}
</script>
