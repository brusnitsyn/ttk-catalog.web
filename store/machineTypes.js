export const state = () => ({
  machineTypes: [],
  machineType: {},

  selectedBrandId: 0,
  machineTypesForBrand: []
})

import { filterMachineTypesForBrand } from '~/helpers/filters'
export const mutations = {
  setMachineTypes(state, machineTypes) {
    state.machineTypes = machineTypes
  },
  setMachineType(state, machineType) {
    state.machineType = machineType
  },
  setMachineTypesForBrand(state, machineTypesForBrand) {
    state.machineTypesForBrand = machineTypesForBrand
  },
  setBrandId(state, brandId) {
    state.selectedBrandId = brandId
  },
  filterMachinesTypesForBrand(state) {
    const machineTypes = [...state.machineTypes]
    state.machineTypesForBrand = filterMachineTypesForBrand(state.selectedBrandId, machineTypes)
  },
}

export const actions = {
  async fetchAllMachineTypes({commit}) {
    const data = this.$axios.get('/machines-types')
    const result = await data
    await commit('setMachineTypes', result.data.data)
  },
  async setBrandId({commit}, brandId) {
    await commit('setBrandId', brandId)
    await commit('filterMachinesTypesForBrand')
  },
}

export const getters = {
  getMachineTypes(state) { return state.machineTypes },
  getMachineTypesForBrand(state) { return state.machineTypesForBrand },
}
