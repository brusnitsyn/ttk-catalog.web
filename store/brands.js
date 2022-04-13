export const state = () => ({
  brands: [],
  brand: {},
  length: 0
})

export const mutations = {
  setBrands(state, brands) {
    state.brands = brands
  },
  setBrand(state, brand) {
    state.brand = brand
  },
  setLength(state, length) {
    state.length = length
  }
}

export const actions = {
  async getBrands(context) {
    const data = this.$axios.get('manufacturers')
    const result = await data
    context.commit('setBrands', result.data.data)
    context.commit('setLength', result.data.data.length)
  },

}

export const getters = {

}
