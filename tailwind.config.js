module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        'primary': '#E93535'
      }
    },
  },
  plugins: [],
}
