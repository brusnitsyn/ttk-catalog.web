export const state = () => ({
  banners: [],
  banner: {},
})

export const mutations = {
  setBanners(state, banners) {
    state.banners = banners
  },
  setBanner(state, banner) {
    state.banner = banner
  },
  pushBanner(state, banner) {
    state.banners.push(banner)
  }
}

export const actions = {
  async fetchAllBanners(context) {
    const data = this.$axios.get('/banners')
    const result = await data
    context.commit('setBanners', result.data.data)
  },
  async postBanner({commit}, banner) {
    const formData = new FormData;
    formData.append('header', banner.header)
    formData.append('subheader', banner.subheader)
    formData.append('url', banner.url)
    formData.append('image', banner.image)

    const data = await this.$axios.post('/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const result = await data
    await commit('pushBanner', result.data.data)
  }
}

export const getters = {
  getBrands(state) { return state.brands },
}
