<template>
  <div>
    <Header class="hidden md:block sticky top-0 w-full bg-white bg-opacity-50 backdrop-blur-lg z-50" />
    <Nuxt keep-alive :keep-alive-props="{ max: 10, exclude: ['pages/catalog/product.vue'] }" class="min-h-screen" />
    <Footer />
    <MobileMenu class="md:hidden" />
    <TheSearch />
  </div>
</template>
<style>
body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background-color: #F59E0B;
  border-radius: 20px;
  border: 3px solid transparent;
}
</style>

