export const state = () => ({
  products: [],
  filteredProducts: [],
  product: {},
  filter: {
    search: '',
    brand: 'all',
    machine: 'all',
    order: 'created_at',
  },
})

import * as Filters from '~/helpers/filters'
export const mutations = {
  setProducts(state, products) {
    state.products = products
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
  async getProducts(context) {
    const data = axios.get('/products')
    const result = await data
    context.commit('setProducts', result)
  },

  // Search & filtering
  async filterOrder({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderProducts')
  },
  async filterBrand({ commit, dispatch }, brand) {
    await commit('setFilterBrand', brand)
    dispatch('orderProducts')
  },
  async filterMachine({ commit, dispatch }, machine) {
    await commit('setFilterMachine', machine)
    dispatch('orderProducts')
  },
  async filterMachineType({ commit, dispatch }, machineType) {
    await commit('setFilterMachineType', machineType)
    dispatch('orderProducts')
  },
  async filterProducts({ commit }) {
    await commit('filterProducts')
    await commit('orderProducts')
  },
}

export const getters = {}
