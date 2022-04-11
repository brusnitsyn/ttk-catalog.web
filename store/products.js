export const state = () => ({
  productsList: []
})

export const mutations = {
  setProductsList(state, productsList) {
    state.productsList = productsList
  },
}

export const actions = {
  async getProducts(context) {
    const data = axios.get('/products')
    const result = await data
    context.commit('setProductsList', result)
  },
}

export const getters = {
  getProductsByFilter: state => filter => {
    // Фильтруем товары
    let filtered = state.all
      // По категории
      .filter(product => {
        return filter.selectCategory == 0 || product.categoryId == filter.selectCategory;
      })

      // По брендам
      .filter(product => {
        return filter.selectBrand == 0 || product.brandId == filter.selectBrand;
      })

      // По ценам
      .filter(product => {
        return Number(product.price) >= filter.minPrice && Number(product.price) <= filter.maxPrice;
      })

      // По полю поиска
      .filter(product => {
        return filter.inputSearch == '' || product.title.toLowerCase().indexOf(filter.inputSearch.toLowerCase()) !== -1;
      });

    // Сортируем
    let sortKey = filter.selectSort.split(':')[0];
    let sortDir = filter.selectSort.split(':')[1];

    let sorted = _.sortBy(filtered, product => {
      return Number(product[sortKey]);
    });

    // При необходимости сортируем в обратном направлении
    if (sortDir === 'desc') {
      sorted = sorted.reverse();
    }

    return sorted;
  }
}
