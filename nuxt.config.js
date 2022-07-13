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

  ssr: false,

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
        url: 'https://api.nilparts.shop',
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
  sitemap: {
    hostname: 'https://nilparts.shop',
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    routes: []
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    options: {
      polyfill: true,
      throttle: 200
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/yandex-metrika', '@nuxtjs/auth-next', '@nuxtjs/sitemap', 'nuxt-breakpoints'],
  publicRuntimeConfig: {
    yandexMetrika: {
      id: 89530884,
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.nilparts.shop/',
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
