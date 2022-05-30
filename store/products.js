export const state = () => ({
  products: [],
  productsByFilterNew: [],
  filteredProducts: [],
  categories: [],
  product: {
    properties: [],
  },

  filter: {
    search: '',
    brand: 'all',
    machineType: 'all',
    machine: 'all',
    order: 'created_at',
  },
  pagination: {
    currentPage: 1,
    from: 1,
    lastPage: 1,
    perPage: 15,
    to: 3,
    total: 3,
    links: {
      first: '',
      last: '',
      prev: '',
      next: '',
    },
  },

  showCreateDialog: false,
  showPropertiesDialog: false,
})

import * as Filters from '~/helpers/filters'
export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setProduct(state, product) {
    state.product = product
  },

  pushProductCarouselImage(state, image) {
    state.formData.carouselImages.push(image)
    //state.product.carouselImages.push(image)
  },

  pushProperty(state, property) {
    state.product.properties.push(property)
  },
  removeProperty(state, property) {
    const properties = [...state.product.properties]
    properties.forEach((prop, index, obj) => {
      if (prop.id === property.id) {
        state.product.properties.splice(index, 1)
      }
    })
  },

  setPagination(state, pagination) {
    state.pagination.currentPage = pagination.currentPage
    state.pagination.from = pagination.from
    state.pagination.lastPage = pagination.lastPage
    state.pagination.perPage = pagination.perPage
    state.pagination.to = pagination.to
    state.pagination.total = pagination.total
    state.pagination.links.first = pagination.links.first
    state.pagination.links.last = pagination.links.last
    state.pagination.links.prev = pagination.links.prev
    state.pagination.links.next = pagination.links.next
  },

  addProduct(state, product) {
    state.products.push(product)
  },

  // Product props
  // setProductName(state, name) {
  //   state.product.name = name
  // },

  setShowCreateDialog(state, value) {
    state.showCreateDialog = value
  },
  setShowPropertiesDialog(state, value) {
    state.showPropertiesDialog = value
  },

  // Search & filtering
  setProductsByFilterNew(state, products) {
    state.productsByFilterNew = products
  },
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
  async fetchAllProducts({ commit, state }, url) {
    const data = await this.$axios.get(url)
    const result = await data
    await commit('setProducts', result.data.data)
    await commit('setFilteredProducts', result.data.data)
    let pagination = {
      links: {},
    }
    pagination.currentPage = result.data.meta.current_page
    pagination.from = result.data.meta.from
    pagination.lastPage = result.data.meta.last_page
    pagination.perPage = result.data.meta.per_page
    pagination.to = result.data.meta.to
    pagination.total = result.data.meta.total
    pagination.links.first = result.data.links.first
    pagination.links.last = result.data.links.last
    pagination.links.prev = result.data.links.prev
    pagination.links.next = result.data.links.next

    await commit('setPagination', pagination)
  },
  async fetchProductsByFilter({ commit }, params) {
    const data = await this.$axios.get('/products', {
      params,
      paramsSerializer: function paramsSerializer(params) {
        return Object.entries(Object.assign({}, params)).
          map(([key, value]) => `${key}=${value}`).
          join('&');
      }
    })
    const result = await data
    await commit('setProducts', result.data.data)

    let pagination = {
      links: {},
    }
    pagination.currentPage = result.data.meta.current_page
    pagination.from = result.data.meta.from
    pagination.lastPage = result.data.meta.last_page
    pagination.perPage = result.data.meta.per_page
    pagination.to = result.data.meta.to
    pagination.total = result.data.meta.total
    pagination.links.first = result.data.links.first
    pagination.links.last = result.data.links.last
    pagination.links.prev = result.data.links.prev
    pagination.links.next = result.data.links.next
    await commit('setPagination', pagination)
  },
  async fetchProductsByFilterNew({ commit }) {
    const params = { category: 1 }
    const data = await this.$axios.get('/products', {
      params,
    })

    const result = await data
    await commit('setProductsByFilterNew', result.data.data)
  },
  async fetchSingleProduct({ commit }, productId) {
    const data = await this.$axios.get(`/products/${productId}`)
    const result = await data
    await commit('setProduct', result.data.data)
  },
  async fetchAllCategories({ commit }) {
    const data = await this.$axios.get('/categories')
    const result = await data
    await commit('setCategories', result.data.data)
  },
  async deleteSingleProduct({ commit }, product) {

  },
  async changeProductName({ commit }, name) {
    await commit('setProductName', name)
  },
  async pushSingleProduct({ commit, state }, product) {
    const sendData = new FormData()

    sendData.append('name', product.name)
    sendData.append('article', product.article)
    sendData.append('actualPrice', product.actualPrice)
    product.discountPrice ? sendData.append('discountPrice', product.discountPrice) : sendData.append('discountPrice', '')
    sendData.append('brandId', product.brandId)
    sendData.append('categoryId', product.categoryId)

    product.images.forEach((img) => {
      sendData.append('images[]', img.raw)
    })

    sendData.append('machines', JSON.stringify(product.machines))
    sendData.append('properties', JSON.stringify(state.product.properties))

    const data = await this.$axios.post('/products', sendData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const result = await data
    await commit('addProduct', result.data.data)
  },
  async setShowCreateDialog({ commit, dispatch }, value) {
    await commit('setShowCreateDialog', value)
    await dispatch('ui/setOpenDialog', value, { root: true })
  },
  async setShowPropertiesDialog({ commit, dispatch }, value) {
    await commit('setShowPropertiesDialog', value)
    // await dispatch('ui/setOpenDialog', value, { root: true })
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
  getProducts(state) {
    return state.products
  },
  getFilteredProducts(state) {
    return state.filteredProducts
  },
  getProduct(state) {
    return state.product
  },

  getFormData(state) {
    return state.formData
  },

  getShowCreateDialog(state) {
    return state.showCreateDialog
  },
  getShowPropertiesDialog(state) {
    return state.showPropertiesDialog
  },

  getPagination(state) {
    return state.pagination
  },

  getCategories(state) {
    return state.categories
  },
  getProductsByFilterNew(state) {
    return state.productsByFilterNew
  }
}
