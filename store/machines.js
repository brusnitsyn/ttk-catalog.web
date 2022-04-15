export const state = () => ({
  machines: [],
  machine: {},
})

export const mutations = {
  setMachines(state, machines) {
    state.machines = machines
  },
  setMachine(state, machine) {
    state.machine = machine
  },
}

export const actions = {
  async fetchAllMachines(context) {
    const data = this.$axios.get('machines')
    const result = await data
    context.commit('setMachines', result.data.data)
  },
}

export const getters = {
  getMachines(state) { return state.machines },
}
