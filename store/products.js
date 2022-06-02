export const state = () => ({
  products: [],
  productsNew: [],
  productsSale: [],
  categories: [],
  product: {
    properties: [],
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
})

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
  setProductsNew(state, products) {
    state.productsNew = products
  },
  setProductsSale(state, products) {
    state.productsSale = products
  },
  popProduct(state, product) {
    state.products.forEach((item, index) => {
      if (item.id === product.id) {
        state.products.splice(index, 1)
      }
    })
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
        return Object.entries(Object.assign({}, params))
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      },
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
    const params = { category: 2 }
    const data = await this.$axios.get('/products', {
      params,
    })
    const result = await data
    await commit('setProductsNew', result.data.data)
  },
  async fetchProductsByFilterSale({ commit }) {
    const params = { category: 3 }
    const data = await this.$axios.get('/products', {
      params,
    })
    const result = await data
    await commit('setProductsSale', result.data.data)
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
    await this.$axios.delete(`/products/${product.id}`)
    await commit('popProduct', product)
  },
  async pushProperty({ commit }, property) {
    await commit('pushProperty', property)
  },
  async pushSingleProduct({ commit, state }, product) {
    const sendData = new FormData()

    sendData.append('name', product.name)
    sendData.append('article', product.article)
    sendData.append('actualPrice', product.actualPrice)
    product.discountPrice
      ? sendData.append('discountPrice', product.discountPrice)
      : sendData.append('discountPrice', '')
    sendData.append('brandId', product.brandId)
    sendData.append('typeId', product.typeId)
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
}

export const getters = {
  getProducts(state) {
    return state.products
  },
  getProduct(state) {
    return state.product
  },

  getPagination(state) {
    return state.pagination
  },

  getCategories(state) {
    return state.categories
  },
  getProductsNew(state) {
    return state.productsNew
  },
  getProductsSale(state) {
    return state.productsSale
  },
}
