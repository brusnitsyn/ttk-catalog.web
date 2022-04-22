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
    const data = this.$axios.get('/api/machines')
    const result = await data
    await commit('setMachines', result.data.data)
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