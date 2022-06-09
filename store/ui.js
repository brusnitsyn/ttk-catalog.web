export const state = () => ({
  fixedBody: false,
  isMobileMenuShow: false,
  isSearchDialogShow: false,
})

export const mutations = {
  fixedBody(state) {
    state.fixedBody = !state.fixedBody
  },

  mobileMenuShow(state) {
    state.isMobileMenuShow = !state.isMobileMenuShow
  },

  searchDialog(state) {
    state.isSearchDialogShow = !state.isSearchDialogShow
  },
}

export const actions = {
  async switchFixedBody({ commit }) {
    await commit('fixedBody')
  },

  async switchMobileMenuShow({ commit }) {
    await commit('fixedBody')
    await commit('mobileMenuShow')
  },

  async switchSearchDialogShow({ commit }) {
    await commit('fixedBody')
    await commit('searchDialog')
  },
}

export const getters = {
  getSwitchFixedBody(state) {
    return state.fixedBody
  },

  getMobileMenuShow(state) {
    return state.isMobileMenuShow
  },

  getSearchDialogShow(state) {
    return state.isSearchDialogShow
  },
}
