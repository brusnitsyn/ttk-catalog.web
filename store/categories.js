export const state = () => ({
  categories: [],
  techniques: [],
  equipmentManufacturers: [],
  searchQuery: ''
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
    const data = this.$axios.get('http://127.0.0.1:8000/api/categories')
    const result = await data
    context.commit('setCategories', result)
  },
  async getTechnique(context) {
    const data = this.$axios.get('http://127.0.0.1:8000/api/techniques')
    const result = await data
    context.commit('setTechniques', result)
  },
  async getEquipmentManufacturers(context) {
    const data = this.$axios.get('http://127.0.0.1:8000/api/manufacturers')
    const result = await data
    context.commit('setEquipmentManufacturers', result.data.data)
  },

}

export const getters = {

}
