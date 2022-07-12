export const actions = {
  async nuxtServerInit({ dispatch }) {
    dispatch('products/getProducts')
    dispatch('brands/getBrands')
    dispatch('machines/getMachines')
  }
}
