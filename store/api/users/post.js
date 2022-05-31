export const actions = {
  async deleteUser({ commit }, userId) {
    const data = await this.$axios.post(`/users/${userId}`, {_method: 'delete'})
  }
}
