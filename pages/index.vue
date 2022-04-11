<template>
  <div class="grid grid-cols-2">
    <div>
      <h1 class="font-bold text-2xl">Фильтры</h1>
      <ProductFilters @filter="filter" />
    </div>
    <div class="grid grid-cols-3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      filterForm: {
        inputSearch: '',
        selectTypeMachine: 0,
        selectSupplier: 0,
        minPrice: 0,
        maxPrice: 0,
        sortDir: 'asc',
      },
    }
  },
  methods: {
    filter: function () {},
  },
  mounted() {
    this.$store.dispatch('categories/getEquipmentManufacturers')
  },
}
</script>
