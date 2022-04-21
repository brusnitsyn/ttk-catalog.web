export const state = () => ({
  products: [],
  filteredProducts: [],
  product: {},
  filter: {
    search: '',
    brand: 'all',
    machineType: 'all',
    machine: 'all',
    order: 'created_at',
  },
  formData: {
    name: '',
    article: '',
    actual_price: null,
    discount_price: null,
    weight: null,
    image: '',
    machines: []
  },
  showCreateDialog: false
})

import * as Filters from '~/helpers/filters'
export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProduct(state, product) {
    state.product = product
  },

  setShowCreateDialog(state, value) {
    state.showCreateDialog = value
  },

  // Search & filtering
  setFilteredProducts(state, products) {
    state.filteredProducts = products
  },
  setFilterBrand(state, brand) {
    state.filter.brand = brand
  },
  setFilterMachine(state, machine) {
    state.filter.machine = machine
  },
  setFilterMachineType(state, machineType) {
    state.filter.machineType = machineType
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  serOrder(state, order) {
    state.filter.order = order
  },
  filterProducts(state) {
    const products = [...state.products]
    state.filteredProducts = products
    state.filteredProducts = Filters.filterProducts(state.filter, products)
  },
  orderProducts(state) {
    const products = [...state.filteredProducts]
    state.filteredProducts = Filters.orderProducts(state.filter.order, products)
  },
}

export const actions = {
  async fetchAllProducts({ commit }) {
    const data = this.$axios.get('/api/products')
    const result = await data
    await commit('setProducts', result.data.data)
    await commit('setFilteredProducts', result.data.data)
  },
  async fetchSingleProduct({ commit }, productId) {
    const data = this.$axios.get(`/api/products/${productId}`)
    const result = await data
    await commit('setProduct', result.data.data)
  },
  async deleteSingleProduct({commit}, product) {

  },
  async setShowCreateDialog({ commit, dispatch }, value) {
    await commit('setShowCreateDialog', value)
    await dispatch('ui/setOpenDialog', value, { root: true })
  },

  // Search & filtering
  async filterOrder({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderProducts')
  },
  async filterBrand({ commit, dispatch }, brand) {
    await commit('setFilterBrand', brand)
    dispatch('filterProducts')
  },
  async filterMachine({ commit, dispatch }, machine) {
    await commit('setFilterMachine', machine)
    dispatch('filterProducts')
  },
  async filterMachineType({ commit, dispatch }, machineType) {
    await commit('setFilterMachineType', machineType)
    dispatch('filterProducts')
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterProducts')
  },
  async filterProducts({ commit }) {
    await commit('filterProducts')
    await commit('orderProducts')
  },
}

export const getters = {
  getProducts(state) { return state.products },
  getFilteredProducts(state) { return state.filteredProducts },
  getProduct(state) { return state.product },

  getFormData(state) { return state.formData },

  getShowCreateDialog(state) { return state.showCreateDialog }
}
