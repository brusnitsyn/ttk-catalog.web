export function filterProducts(filter, products) {
  let filteredList = products

  // Filter brand
  if (filter.brand !== 'all') {
    const filtered = filteredList.filter(product => product.machine.brand.name === filter.brand)
    filteredList = filtered
  }

  // Filter machine types
  if (filter.machineType !== 'all') {
    const filtered = filteredList.filter(product => product.machine.machineType.name === filter.machineType)
    filteredList = filtered
  }

  // Filter machine
  if (filter.machine !== 'all') {
    const filtered = filteredList.filter(product => product.machine.name === filter.machine)
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()
    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].name !== null && filteredList[i].name.toLowerCase().includes(searchTerm)) ||
        (filteredList[i].article !== null && filteredList[i].article.toLowerCase().includes(searchTerm))
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}

import moment from 'moment'
export function orderProducts(order, products) {
  const orderedList = [...products]
  if (order === 'created_at') {
    orderedList.sort(function (a, b) {
      const unixA = moment(a.created_at).unix()
      const unixB = moment(b.created_at).unix()
      return unixA < unixB ? -1 : 1
    })
  } else {
    orderedList.sort(function (a, b) {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz'
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}

export function filterMachineTypesForBrand(brandId, machineTypes) {
  let machinesList = machineTypes
  const filtered = machinesList.filter(machineType => machineType.brand.id === brandId)

  return filtered
}

export function filterMachineForType(machineTypeId, machines) {
  let machinesList = machines
  const filtered = machinesList.filter(machine => machine.machineType.id === machineTypeId)

  return filtered
}
