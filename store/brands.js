export const state = () => ({
  brands: [],
  brand: {},
})

export const mutations = {
  setBrands(state, brands) {
    state.brands = brands
  },
  setBrand(state, brand) {
    state.brand = brand
  },
}

export const actions = {
  async fetchAllBrands(context) {
    const data = this.$axios.get('/brands')
    const result = await data
    context.commit('setBrands', result.data.data)
  },
  async getRelationBrandMachineType({context}, brandId) {

    context.commit('setBrandMachineTypes', filtered)
  },
}

export const getters = {
  getBrands(state) { return state.brands },
}
