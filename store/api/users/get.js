export const state = () => ({
  users: [],
  user: {},
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
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    state.user = user
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
}

export const actions = {
  async fetchAllUsers({ commit }) {
    const data = await this.$axios.get('/users')
    const result = await data
    await commit('setUsers', result.data.data)
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
  async fetchSingleUser({ commit }, userId) {
    const data = await this.$axios.get(`/properties/${userId}`)
    const result = await data
    await commit('setUser', result.data.data)
  },
  async deleteSingleProduct({ commit }, product) {

  },
}

export const getters = {
  getUsers(state) { return state.users },
  getUser(state) { return state.user },
  getPagination(state) { return state.pagination },
}
