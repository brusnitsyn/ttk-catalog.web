export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Запчасти для сельхозтехники — Компания НИЛ',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#E93535' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Продажа запасных частей для сельхозтехники, по выгодным ценам.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  ssr: true,

  // router: {
  //   middleware: 'dialogs',
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/VueAwesomeSwiper', ssr: false },
    { src: '@/plugins/VueTheMask' },
    { src: '@/plugins/ElementUI', ssr: false },
    { src: '@/plugins/vClickOutside', ssr: false },
    { src: '@/plugins/ymapPlugin', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8', '@nuxtjs/moment'],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'https://dv-ttk.ru/api',
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          refresh: {
            url: '/auth/refresh',
            method: 'post',
          },
          user: { url: '/user', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/yandex-metrika', '@nuxtjs/auth-next'],
  publicRuntimeConfig: {
    yandexMetrika: {
      id: 88691917,
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://dv-ttk.ru/api/',
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
    // assetFilter: function (assetFilename) {
    //   return assetFilename.endsWith('.js')
    // },
    // extend(config, { isDev, isClient }) {
    //   if (isClient) {

    //   }
    // },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
