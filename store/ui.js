export const state = () => ({
  bodyScroll: false,
})

export const mutations = {
  bodyScroll(state) {
    state.bodyScroll = !state.bodyScroll
  },
}

export const actions = {
  async switchBodyScroll({ commit }) {
    await commit('bodyScroll')
  },
}

export const getters = {
  getSwitchBodyScroll(state) {
    return state.bodyScroll
  },
}
