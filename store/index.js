export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('brands/fetchAllBrands')
    await dispatch('machines/fetchAllMachines')
    await dispatch('machineTypes/fetchAllMachineTypes')
  }
}
