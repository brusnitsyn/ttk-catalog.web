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
  async addProduct({ commit }, { product, productQty }) {
    let productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (!productsInStorage || Object.prototype.toString.call(productsInStorage) !== '[object Array]') {
      productsInStorage = []
    }

    if (productsInStorage) {
      const basketProduct = productsInStorage.find(item => item.product.id == product.id);
      if (basketProduct) {
        basketProduct.qty++;
      } else {
        let id = productsInStorage.length
        productsInStorage.push(Object.assign({}, { product }, { id: ++id, qty: productQty }))
      }
    } else {
      productsInStorage.push(Object.assign({}, { product }, { id: 1, qty: productQty }))
    }

    window.localStorage.setItem('basket', JSON.stringify(productsInStorage))
    await commit('setProducts', productsInStorage)
  },
  async deleteProduct({ commit }, product) {
    let productsInStorage = JSON.parse(window.localStorage.getItem("basket"))
    if (productsInStorage && productsInStorage.length > 0) {
      productsInStorage.forEach((item, index, obj) => {
        if (item.product.id === product.id) {
          obj.splice(index, 1)
        }
      });
      window.localStorage.setItem('basket', JSON.stringify(productsInStorage))
      await commit('setProducts', productsInStorage)
    }
  }
}

export const getters = {
  getProducts(state) { return state.products },
}
