export function filterProducts(filter, products) {
  let filteredList = products

  // Filter brand
  if (filter.brand !== 'all') {
    const filtered = filteredList.filter(
      (product) => product.brand === filter.brand
    )
    filteredList = filtered
  }

  // Filter machine types
  if (filter.machineType !== 'all') {
    // const find = ({ name, machines, machineType }) =>
    //   name.includes(filter.machineType) ||
    //   (machines && machines.some(find)) ||
    //   (machineType && machineType.some(find))
    // const filtered = filteredList.filter(find)
    const filtered = filteredList.filter(
      (product) =>
        product.machines.filter(
          (machine) => machine.machineType.name === filter.machineType
        ).length > 0
    )
    filteredList = filtered
  }

  // Filter machine
  if (filter.machine !== 'all') {
    let filtered = []
    filteredList.filter((product) => {
      product.machines.filter((item) => {
        if (item.name === filter.machine) filtered.push(product)
      })
    })
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()
    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].name !== null &&
          filteredList[i].name.toLowerCase().includes(searchTerm)) ||
        (filteredList[i].article !== null &&
          filteredList[i].article.toLowerCase().includes(searchTerm))
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
  const filtered = machinesList.filter(
    (machineType) => machineType.brand.id === brandId
  )

  return filtered
}

export function filterMachineForType(machineTypeId, machines) {
  let machinesList = machines
  const filtered = machinesList.filter(
    (machine) => machine.machineType.id === machineTypeId
  )

  return filtered
}

function arrayToQueryString(array, keyName) {
  var out = new Array();

  for (var key in array) {
    if (!array[keyName])
      out.push(keyName + '=' + encodeURIComponent(array[key]));
  }

  console.log(out)

  return out.join('&');
}

export function complexToQueryString(object, parentNode = null) {
  const query = Object.entries(object).map((item) => {
    const key = parentNode ? `${parentNode}[${item[0]}]` : item[0]
    const value = item[1]

    if (value instanceof Object) {
      return complexToQueryString(value, key)
    } else if (item[1] !== undefined) {
      return [
        Array.isArray(item[0]) ? `${key}[]` : key,
        encodeURIComponent(item[1]),
      ].join('=')
    }

    return ''
  })
    .filter(empty => empty)
    .join('&')

  return query
}
