export const state = () => ({
  brands: [],
  machineTypes: [],
  machines: [],
})

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setTechniques(state, techniques) {
    state.techniques = techniques
  },
  setEquipmentManufacturers(state, equipmentManufacturers) {
    state.equipmentManufacturers = equipmentManufacturers
  },

  setSearchQuery(state, query) {
    state.searchQuery = query
  }
}

export const actions = {
  async getCategories(context) {
    const data = this.$axios.get('categories')
    const result = await data
    context.commit('setCategories', result)
  },
  async getTechnique(context) {
    const data = this.$axios.get('techniques')
    const result = await data
    context.commit('setTechniques', result)
  },
  async getEquipmentManufacturers(context) {
    const data = this.$axios.get('manufacturers')
    const result = await data
    context.commit('setEquipmentManufacturers', result.data.data)
  },

}

export const getters = {

}
