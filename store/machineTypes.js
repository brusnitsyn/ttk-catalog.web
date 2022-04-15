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
}

export const actions = {
  async fetchAllMachineTypes(context) {
    const data = this.$axios.get('machines-types')
    const result = await data
    context.commit('setMachineTypes', result.data.data)
  },
}

export const getters = {
  getMachineTypes(state) { return state.machineTypes },
}
