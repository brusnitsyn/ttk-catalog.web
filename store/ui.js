export const state = () => ({
  openDialog: false
})

export const mutations = {
  setOpenDialog(state, value) {
    state.openDialog = value
  },
}

export const actions = {
  async setOpenDialog({commit}, value) {
    await commit('setOpenDialog', value)
  },
}

export const getters = {
  getOpenDialog(state) { return state.openDialog },
}
