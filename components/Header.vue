<template>
  <div>
    <Container>
      <div
        class="
          flex flex-row
          justify-between
          items-center
          gap-x-4
          py-4
          lg:py-6 lg:gap-x-6
        "
      >
        <nuxt-link :to="'/'">
          <Logo />
        </nuxt-link>

        <div class="hidden md:flex flex-row gap-x-4 font-inter">
          <nuxt-link :to="`/`">Главная</nuxt-link>
          <nuxt-link :to="`/products`">Каталог</nuxt-link>
          <!-- <nuxt-link :to="`/info`">О нас</nuxt-link>
          <nuxt-link :to="`/contacts`">Контакты</nuxt-link> -->
        </div>

        <!-- <ProductSearchInput class=" w-64" /> -->
      </div>
    </Container>
  </div>
</template>
