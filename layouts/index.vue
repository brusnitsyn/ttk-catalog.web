<template>
  <div>
    <Header
      class="sticky top-0 w-full bg-white bg-opacity-50 backdrop-blur-lg z-50"
    />
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    <!-- <Footer /> -->
  </div>
</template>
