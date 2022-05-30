export const state = () => ({
  filters: [],
})

export const mutations = {
  addFilter(state, filter) {
    state.filters.push(filter)
  },
}

export const actions = {
  // async fetchAllProperties({ commit }) {
  //   const data = await this.$axios.get('/properties')
  //   const result = await data
  //   await commit('setProperties', result.data.data)
  // },
  // async fetchSingleProperty({ commit }, propertyId) {
  //   const data = await this.$axios.get(`/properties/${propertyId}`)
  //   const result = await data
  //   await commit('setProperty', result.data.data)
  // },
  // async pushSingleProduct({ commit }, property) {
  //   const data = await this.$axios.post('/properties', property)
  //   const result = await data
  //   await commit('addProperty', result.data.data)
  // },
}

export const getters = {
  getFilters(state) { return state.properties },
}
