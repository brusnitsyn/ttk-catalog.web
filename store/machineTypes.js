export const state = () => ({
  machineTypes: [],
  machineType: {},
})
export const mutations = {
  setMachineTypes(state, machineTypes) {
    state.machineTypes = machineTypes
  },
  setMachineType(state, machineType) {
    state.machineType = machineType
  },
  pushMachineTypes(state, machineType) {
    state.machineTypes.push(machineType)
  },
}

export const actions = {
  async fetchAllMachineTypes({ commit }) {
    const data = this.$axios.get('/machines-types')
    const result = await data
    await commit('setMachineTypes', result.data.data)
  },
  async postSingleMachineType({ commit }, machineType) {
    const data = this.$axios.post('/machines-types', machineType)
    const result = await data
    await commit('pushMachineTypes', result.data.data)
  }
}

export const getters = {
  getMachineTypes(state) { return state.machineTypes },
}
