export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  clearProducts(state) {
    state.products = []
  }
}

export const actions = {
  async fetchProductsBySearchQuery({ commit }, searchParam) {
    const data = await this.$axios.get('/products', {
      params: searchParam
    })
    const result = await data
    await commit('setProducts', result.data.data)
  },
}

export const getters = {
  getProducts(state) {
    return state.products
  },
}
