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
  // formData: {
  //   name: '',
  //   article: '',
  //   originalArticle: '',
  //   actualPrice: 0,
  //   discountPrice: 0,
  //   weight: 0,
  //   width: null,
  //   diameter: null,
  //   thickness: null,
  //   height: null,
  //   length: null,
  //   hole: '',
  //   previewImage: null,
  //   brand: null,
  //   carouselImages: [],
  //   machines: []
  // },
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

  pushProductCarouselImage(state, image) {
    state.formData.carouselImages.push(image)
    //state.product.carouselImages.push(image)
  },
  addProduct(state, product) {
    state.products.push(product)
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
    const data = await this.$axios.get('/api/products')
    const result = await data
    await commit('setProducts', result.data.data)
    await commit('setFilteredProducts', result.data.data)
  },
  async fetchSingleProduct({ commit }, productId) {
    const data = await this.$axios.get(`/api/products/${productId}`)
    const result = await data
    await commit('setProduct', result.data.data)
  },
  async deleteSingleProduct({ commit }, product) {

  },
  async pushSingleProduct({ commit }, product) {
    const sendData = new FormData()

    sendData.append('name', product.name)
    sendData.append('article', product.article)
    sendData.append('originalArticle', (typeof product.originalArticle === 'undefined') ? '' : product.originalArticle)
    sendData.append('actualPrice', (typeof product.actualPrice === 'undefined') ? '' : product.actualPrice)
    sendData.append('discountPrice', (typeof product.discountPrice === 'undefined') ? '' : product.discountPrice)
    sendData.append('weight', product.weight)
    sendData.append('width', (typeof product.width === 'undefined') ? '' : product.width)
    sendData.append('diameter', (typeof product.diameter === 'undefined') ? '' : product.diameter)
    sendData.append('thickness', (typeof product.thickness === 'undefined') ? '' : product.thickness)
    sendData.append('height', (typeof product.height === 'undefined') ? '' : product.height)
    sendData.append('length', (typeof product['length'] === 'undefined') ? '' : product['length'])
    sendData.append('hole', (typeof product.hole === 'undefined') ? '' : product.hole)
    sendData.append('mountingHole', (typeof product.mountingHole === 'undefined') ? '' : product.mountingHole)
    sendData.append('captureWidth', (typeof product.captureWidth === 'undefined') ? '' : product.captureWidth)
    sendData.append('thread', (typeof product.thread === 'undefined') ? '' : product.thread)
    sendData.append('distanceBetweenHoles', (typeof product.distanceBetweenHoles === 'undefined') ? '' : product.distanceBetweenHoles)
    sendData.append('description', (typeof product.description === 'undefined') ? '' : product.description)

    sendData.append('previewImage', product.previewImage.raw)
    sendData.append('brandId', product.brand.id)

    product.carouselImages.forEach((img) => {
      sendData.append('carouselImages[]', img.raw)
    })

    sendData.append('machines', JSON.stringify(product.machines))

    const data = await this.$axios.post('/api/products', sendData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const result = await data
    await commit('addProduct', result.data.data)
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
