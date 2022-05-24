<template>
  <div class="pt-6 px-4 flex flex-col">
    <div class="flex justify-between items-center">
      <h1>Баннеры</h1>
      <el-button> Добавить слайд </el-button>
    </div>
    <client-only>
      <swiper
        :options="bannersOptions"
        class="rounded-none lg:rounded-lg h-72 lg:h-[420px]"
      >
        <swiper-slide v-for="banner in banners" :key="banner.id">
          <div
            class="h-full"
            :style="{
              backgroundImage: `url(${banner.image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="flex flex-col">
              <span>
                {{ banner.header }}
              </span>
              <span v-if="banner.subheader">
                {{ banner.subheader }}
              </span>
              <span>
                {{ banner.url }}
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      banners: 'banners/getBanners',
    }),
  },
  data() {
    return {}
  },
  methods: {
    open() {
      this.$prompt('Please input your e-mail', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'Invalid Email',
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'Your email is:' + value,
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },
  },
}
</script>

<style>
</style>
