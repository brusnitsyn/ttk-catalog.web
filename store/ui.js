export const state = () => ({
  openMobileMenu: false,
})

export const mutations = {
  setOpenMobileMenu(state, value) {
    state.openMobileMenu = value
  },
}

export const actions = {
  async setOpenMobileMenu({ commit }, value) {
    await commit('setOpenMobileMenu', value)
  },
}

export const getters = {
  getOpenMobileMenu(state) {
    return state.openMobileMenu
  },
}
