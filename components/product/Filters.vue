<template>
  <div v-cloak class="flex flex-col items-start">
    <div v-if="brands.length">
      <h5 class="text-base font-semibold py-2 select-none">
        Производитель ({{ brands.length }})
      </h5>
      <ul>
        <li v-for="brand in brands" :key="brand.id" class="text-sm px-2 py-1">
          <a @click="sortingBrand(brand)" class="cursor-pointer select-none">
            {{ brand.name }}
          </a>
        </li>
      </ul>
    </div>

    <div v-if="machineTypesForBrand.length">
      <h5 class="text-base font-semibold py-2 select-none">
        Тип техники ({{ machineTypesForBrand.length }})
      </h5>
      <ul>
        <li
          v-for="machineType in machineTypesForBrand"
          :key="machineType.id"
          class="px-2 py-1"
        >
          <a
            @click="sortingMachineType(machineType)"
            class="cursor-pointer select-none text-sm"
          >
            {{ machineType.name }}
          </a>
        </li>
      </ul>
    </div>

    <div v-if="machinesForType.length">
      <h5 class="text-base font-semibold py-2 select-none">
        Техника ({{ machinesForType.length }})
      </h5>
      <ul>
        <li
          v-for="machine in machinesForType"
          :key="machine.id"
          class="px-2 py-1"
        >
          <a
            @click="sortingMachine(machine)"
            class="cursor-pointer select-none text-sm"
          >
            {{ machine.name }}
          </a>
        </li>
      </ul>
    </div>

    <a
      @click="resetFilters"
      v-if="machineTypesForBrand.length"
      class="text-sm cursor-pointer pt-6 hover:text-orange-600 select-none"
      >Сбросить фильтры</a
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      brands: 'brands/getBrands',

      machineTypesForBrand: 'machineTypes/getMachineTypesForBrand',
      machineTypes: 'machineTypes/getMachineTypes',

      machinesForType: 'machines/getMachinesForType',
      machines: 'machines/getMachines',
    }),
  },
  methods: {
    sortingBrand(brand) {
      this.resetFilters()
      this.$store.dispatch('products/filterBrand', brand.name)
      this.$store.dispatch('machineTypes/setBrandId', brand.id)
    },
    sortingMachineType(machineType) {
      this.$store.dispatch('products/filterMachineType', machineType.name)
      this.$store.dispatch('machines/setMachineTypeId', machineType.id)
    },
    sortingMachine(machine) {
      this.$store.dispatch('products/filterMachine', machine.name)
    },

    resetFilters() {
      this.$store.dispatch('products/filterBrand', 'all')
      this.$store.dispatch('products/filterMachineType', 'all')
      this.$store.dispatch('products/filterMachine', 'all')
      this.$store.dispatch('machineTypes/setBrandId', 0)
      this.$store.dispatch('machines/setMachineTypeId', 0)
    },
  },
  async fetch() {
    await this.$store.dispatch('brands/fetchAllBrands')
    await this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    await this.$store.dispatch('machines/fetchAllMachines')
  },
  mounted() {
    if (!this.brands.length) {
      this.$store.dispatch('brands/fetchAllBrands')
    }
    if (!this.machineTypes.length) {
      this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    }
    if (!this.machines.length) {
      this.$store.dispatch('machines/fetchAllMachines')
    }
  },
}
</script>

<style>
</style>
