export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  addProduct(state, product) {
    if (state.products.length === 0) {
      state.products = []
    }
    state.products.push(product)
  },
}

export const actions = {
  async getAllProducts({ commit }) {
    const productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (productsInStorage && productsInStorage.length > 0) {
      await commit('setProducts', productsInStorage)
    }
  },
  async addProduct({ commit }, { product, qty, price }) {
    let productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (!productsInStorage || Object.prototype.toString.call(productsInStorage) !== '[object Array]') {
      productsInStorage = []
    }

    if (productsInStorage) {
      const basketProduct = productsInStorage.find(item => item.product.id == product.id);
      if (basketProduct) {
        basketProduct.qty += qty
        basketProduct.price = Math.round(Number(price) + basketProduct.price)
      } else {
        let id = productsInStorage.length
        productsInStorage.push(Object.assign({}, { product }, { id: ++id, qty, price }))
      }
    } else {
      productsInStorage.push(Object.assign({}, { product }, { id: 1, qty, price }))
    }

    window.localStorage.setItem('basket', JSON.stringify(productsInStorage))
    await commit('setProducts', productsInStorage)
  },
  async editProduct({ commit }, item) {
    let productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (productsInStorage && productsInStorage.length > 0) {
      let index = productsInStorage.findIndex(i => i.id === item.id)
      if (index !== -1) {
        productsInStorage[index].price = item.price
        productsInStorage[index].product = item.product
        productsInStorage[index].qty = item.qty
      }
      window.localStorage.setItem('basket', JSON.stringify(productsInStorage))
      await commit('setProducts', productsInStorage)
    }
  },
  async deleteProduct({ commit }, item) {
    let productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (productsInStorage && productsInStorage.length > 0) {
      let index = productsInStorage.findIndex(i => i.id === item.id)
      if (index !== -1) {
        productsInStorage.splice(index, 1)
      }
      window.localStorage.setItem('basket', JSON.stringify(productsInStorage))
      await commit('setProducts', productsInStorage)
    }
  }
}

export const getters = {
  getProducts(state) { return state.products },
}
