export function filterProducts(filter, products) {
  let filteredList = products

  // Filter brand
  if (filter.brand !== 'all') {
    const filtered = filteredList.filter(product => product.brand.name === filter.brand)
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
    for (let i = 0; i < products.length; i++) {
      if (
        (products[i].name !== null && products[i].name.toLowerCase().includes(searchTerm)) ||
        (products[i].article !== null && products[i].article.toLowerCase().includes(searchTerm))
      ) {
        searchList.push(products[i])
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
