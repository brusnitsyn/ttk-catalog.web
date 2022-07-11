<template>
  <main>
    <AppHeader />
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['ProductPage'] }" class="min-h-screen lg:mt-[8px]" />
    <Footer class="mb-[68px] lg:mb-0"/>
    <Search />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
// const MobileMenu = () => import('@/components/MobileMenu.vue')
import Search from '@/components/TheSearch.vue'
export default {
  components: {
    AppHeader, Search
  }
}
</script>
