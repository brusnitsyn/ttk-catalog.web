export const state = () => ({
  machines: [],
  machine: {},

  selectedMachineTypeId: 0,
  machinesForType: []
})

import { filterMachineForType } from '~/helpers/filters'
export const mutations = {
  setMachines(state, machines) {
    state.machines = machines
  },
  setMachine(state, machine) {
    state.machine = machine
  },
  pushMachine(state, machine) {
    state.machine.push(machine)
  },
  filterMachinesForType(state) {
    const machines = [...state.machines]
    state.machinesForType = filterMachineForType(state.selectedMachineTypeId, machines)
  },
  setMachineTypeId(state, machineType) {
    state.selectedMachineTypeId = machineType
  }
}

export const actions = {
  async fetchAllMachines({ commit }) {
    const data = this.$axios.get('/machines')
    const result = await data
    await commit('setMachines', result.data.data)
  },
  async fetchSingleMachineForMachineType({ commit }, machineTypeId) {
    const data = await this.$axios.get(`/machines?machineType=${machineTypeId}`)
    const result = await data
    await commit('setMachines', result.data.data)
  },
  async postSingleMachine({ commit }, machine) {
    const data = this.$axios.post('/machines', machine)
    const result = await data
    await commit('pushMachine', result.data.data)
  },
  async setMachineTypeId({ commit }, machineTypeId) {
    await commit('setMachineTypeId', machineTypeId)
    await commit('filterMachinesForType')
  }
}

export const getters = {
  getMachines(state) { return state.machines },
  getMachinesForType(state) { return state.machinesForType }
}
