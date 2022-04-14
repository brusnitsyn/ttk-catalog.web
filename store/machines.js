export const state = () => ({
  machines: [],
  machine: {},
  length: 0
})

export const mutations = {
  setMachines(state, machines) {
    state.machines = machines
  },
  setMachine(state, machine) {
    state.machine = machine
  },
  setLength(state, length) {
    state.length = length
  }
}

export const actions = {
  async getMachines(context) {
    const data = this.$axios.get('machines')
    const result = await data
    context.commit('setMachines', result.data.data)
    context.commit('setLength', result.data.data.length)
  },
}

export const getters = {

}
