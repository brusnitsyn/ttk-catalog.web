export const state = () => ({
  properties: [],
  property: {},
})

export const mutations = {
  setProperties(state, properties) {
    state.properties = properties
  },
  setProperty(state, property) {
    state.property = property
  },
  addProperty(state, property) {
    state.properties.push(property)
  }
}

export const actions = {
  async fetchAllProperties({ commit }) {
    const data = await this.$axios.get('/properties')
    const result = await data
    await commit('setProperties', result.data.data)
  },
  async fetchSingleProperty({ commit }, propertyId) {
    const data = await this.$axios.get(`/properties/${propertyId}`)
    const result = await data
    await commit('setProperty', result.data.data)
  },
  async deleteSingleProduct({ commit }, product) {

  },
  async pushSingleProduct({ commit }, property) {
    const data = await this.$axios.post('/properties', property)
    const result = await data
    await commit('addProperty', result.data.data)
  },
}

export const getters = {
  getProperties(state) { return state.properties },
  getProperty(state) { return state.property },
}
