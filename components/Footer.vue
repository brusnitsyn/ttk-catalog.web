<template>
  <div class="py-6 px-4 bg-gray-50">
    <Container
      class="flex flex-col md:flex-row md:items-center justify-between"
    >
      <span>Copyright © {{ year }} ТТК+ Запчасти</span>
      <!-- <div class="flex flex-col md:flex-row gap-y-1 md:gap-y-0 gap-x-4 pt-2">
        <nuxt-link :to="`/`">Главная</nuxt-link>
        <nuxt-link :to="`/products`">Каталог</nuxt-link>
        <nuxt-link :to="`/info`">О нас</nuxt-link>
        <nuxt-link :to="`/contacts`">Контакты</nuxt-link>
      </div> -->
      <div class="flex gap-x-3 pt-2">
        <a href="https://t.me/ttk_plus">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 28C21.7321 28 28 21.7321 28 14C28 6.26801 21.7321 0 14 0C6.26801 0 0 6.26801 0 14C0 21.7321 6.26801 28 14 28Z"
              fill="url(#paint0_linear_229_36)"
            />
            <path
              d="M11.4333 20.4166C10.9797 20.4166 11.0568 20.2453 10.9004 19.8134L9.56665 15.4241L19.8333 9.33325"
              fill="#C8DAEA"
            />
            <path
              d="M11.4333 20.4166C11.7833 20.4166 11.9379 20.2566 12.1334 20.0666L14 18.2515L11.6716 16.8474"
              fill="#A9C9DD"
            />
            <path
              d="M11.6714 16.8477L17.3134 21.016C17.9573 21.3713 18.4219 21.1873 18.5823 20.4185L20.8789 9.59608C21.114 8.65342 20.5196 8.22572 19.9036 8.50537L6.41805 13.7053C5.49755 14.0746 5.50303 14.5881 6.25028 14.8169L9.71097 15.8971L17.7228 10.8425C18.101 10.6132 18.4483 10.7364 18.1634 10.9893"
              fill="url(#paint1_linear_229_36)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_229_36"
                x1="18.676"
                y1="4.676"
                x2="11.676"
                y2="21"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#37AEE2" />
                <stop offset="1" stop-color="#1E96C8" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_229_36"
                x1="15.7552"
                y1="14.001"
                x2="17.9401"
                y2="18.9791"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EFF7FC" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </div>
    </Container>
  </div>
</template>

<script>

export default {
 data() {
   return {
     year: 0
   }
 },
 mounted() {
   let date = new Date()
   this.year = date.getFullYear()
 }
}
</script>

<style>
</style>
