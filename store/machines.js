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
  async getMachines(context) {
    const data = this.$axios.get('techniques')
    const result = await data
    context.commit('setMachines', result.data.data)
  },
}

export const getters = {

}
