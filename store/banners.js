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
  },
  removeBanner(state, banner) {
    const banners = [...state.banners]
    banners.forEach((item, index, obj) => {
      if (item.id === banner.id) {
        state.banners.splice(index, 1)
      }
    })
  },
}

export const actions = {
  async fetchAllBanners(context) {
    const data = this.$axios.get('/banners')
    const result = await data
    context.commit('setBanners', result.data.data)
  },
  async postBanner({ commit }, banner) {
    const formData = new FormData;
    formData.append('header', banner.header)
    formData.append('url', banner.url)
    formData.append('image', banner.image)

    const data = await this.$axios.post('/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const result = await data
    await commit('pushBanner', result.data.data)
  },
  async deleteBanner({ commit }, banner) {
    this.$axios.delete(`/banners/${banner.id}`, banner)
    await commit('removeBanner', banner)
  }
}

export const getters = {
  getBanners(state) { return state.banners },
}
