export const state = () => ({
  openMobileMenu: false,
})

export const mutations = {
  setOpenMobileMenu(state) {
    state.openMobileMenu = !state.openMobileMenu
  },
}

export const actions = {
  async setOpenMobileMenu({ commit }) {
    await commit('setOpenMobileMenu')
  },
}

export const getters = {
  getOpenMobileMenu(state) {
    return state.openMobileMenu
  },
}
