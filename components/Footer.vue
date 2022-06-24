<template>
  <div class="py-8 px-4 bg-gray-50 space-y-3">
    <Container class="flex flex-col text-[#313131]">
      <div class="flex flex-row justify-between items-center pb-7 border-b border-b-gray-400">
        <NuxtLink :to="'/'" replace class="flex flex-row items-center select-none">
          <LogoShort class="h-[30px]" />
          <span class="mx-7 w-px h-[30px] bg-gray-400"></span>
          <p>интернет-магазин</p>
        </NuxtLink>
        <div class="flex flex-row gap-x-2.5">
          <a href="https://t.me/ttk_plus">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.0997 8.12962C14.5827 7.64662 15.0622 6.51962 13.0497 7.88812C10.1902 9.86125 7.37186 11.7136 7.37186 11.7136C7.08175 11.8448 6.76811 11.916 6.44979 11.9229C6.13147 11.9298 5.81503 11.8723 5.51949 11.7539C4.31199 11.3916 2.90236 10.9086 2.90236 10.9086C2.90236 10.9086 1.93986 10.304 3.58749 9.66C3.58749 9.66 10.5534 6.80137 12.9692 5.79425C13.895 5.39175 17.0354 4.10375 17.0354 4.10375C17.0354 4.10375 18.4852 3.53937 18.3645 4.90875C18.3242 5.47225 18.0022 7.44625 17.6802 9.5795C17.1964 12.5991 16.6731 15.9014 16.6731 15.9014C16.6731 15.9014 16.5926 16.8271 15.9084 16.9881C15.1759 16.9757 14.4682 16.7209 13.8959 16.2636C13.7349 16.1429 10.8762 14.3307 9.82886 13.4452C9.72232 13.3731 9.63577 13.2751 9.57725 13.1605C9.51873 13.0459 9.49015 12.9184 9.49416 12.7897C9.49818 12.6611 9.53466 12.5356 9.60022 12.4248C9.66578 12.3141 9.75828 12.2218 9.86911 12.1564C11.3216 10.8281 13.0532 9.177 14.0997 8.12962Z"
                fill="#313131" />
            </svg>
          </a>
        </div>
      </div>
      <div
        class="grid  auto-rows-min gap-y-4 md:gap-x-4 md:grid-cols-3 justify-between border-b border-b-gray-400 py-5">
        <div class="flex flex-col grow-0">
          <p class="text-[#212121] pb-4 leading-[16px]">Навигация</p>
          <ol>
            <li class="pb-2">
              <NuxtLink to="/" replace>
                Главная
              </NuxtLink>
            </li>
            <li class="pb-2">
              <NuxtLink :to="{ name: 'catalog' }" replace>
                Каталог
              </NuxtLink>
            </li>
          </ol>
        </div>
        <div class="flex flex-col">
          <p class="text-[#212121] pb-4 leading-[16px]">Контакты</p>
          <ol class="flex flex-col font-inter">
            <li class="pb-2 flex flex-col items-start">
              <el-link href="tel:+7(924)676-79-67" class="text-base pb-1">+7 (924) 676-79-67</el-link>
              <span class="text-gray-400 leading-[14px] text-sm">Никита | Коммерческий отдел</span>
            </li>
            <li class="pb-2 flex flex-col items-start">
              <el-link href="tel:+7(914)569-21-81" class="text-base pb-1">+7 (914) 569-21-81</el-link>
              <span class="text-gray-400 leading-[14px] text-sm">Алексей | Коммерческий отдел</span>
            </li>
            <li class="pb-2 flex flex-col items-start">
              <el-link href="tel:+7(914)619-12-30" class="text-base pb-1">+7 (914) 619-12-30</el-link>
              <span class="text-gray-400 leading-[14px] text-sm">Андрей | Менеджер</span>
            </li>
            <li class="pb-2 flex flex-col items-start">
              <el-link href="tel:+7(914)043-89-22" class="text-base pb-1">+7 (914) 043-89-22</el-link>
              <span class="text-gray-400 leading-[14px] text-sm">Валерий | Менеджер</span>
            </li>
          </ol>
        </div>
        <yandex-map :coords="coords" :zoom="16" :controls="[]" ymap-class="yamaps">
          <ymap-marker :coords="coords" marker-id="1" hint-content="Мы тут" />
        </yandex-map>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center pt-5">
        <p class="font-inter text-sm">© Делаем и продвигаем сами | {{ year }}</p>
        <a href="mailto:info@dv-ttk.ru" class="font-inter">info@dv-ttk.ru</a>
      </div>
    </Container>

  </div>
</template>

<script>
import('~/assets/css/element-index.scss')

const ElLink = () => import('~/node_modules/element-ui/lib/link')

export default {
  components: {
    ElLink
  },
  data() {
    return {
      year: 0,
      coords: [
        50.262666,
        127.576283,
      ]
    }
  },
  mounted() {
    let date = new Date()
    this.year = date.getFullYear()
  }
}
</script>

<style scoped>
::v-deep .yamaps {
  width: 100%;
  height: 100%;
}
</style>
