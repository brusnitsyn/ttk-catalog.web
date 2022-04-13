<template>
  <div>
    <div v-if="brands">
      <h5 class="text-base font-semibold py-2">
        Производитель ({{ brandsLength }})
      </h5>
      <ul>
        <li v-for="brand in brands" :key="brand.id" class="text-sm px-2 py-1">
          {{ brand.name }}
        </li>
      </ul>
    </div>

    <div v-if="machineTypes">
      <h5 class="text-base font-semibold py-2">Тип техники ({{ brandsLength }})</h5>
      <ul>
        <li
          v-for="machineType in machineTypes"
          :key="machineType.id"
          class="text-sm px-2 py-1"
        >
          {{ machineType.name }}
        </li>
      </ul>
    </div>

    <div v-if="machines">
      <h5 class="text-base font-semibold py-2">Техника ({{ brandsLength }})</h5>
      <ul>
        <li
          v-for="machine in machines"
          :key="machine.id"
          class="text-sm px-2 py-1"
        >
          {{ machine.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    brands() {
      return this.$store.state.brands.brands
    },
    brandsLength() {
      return this.$store.state.brands.length
    },

    machineTypes() {
      return this.$store.state.brands.brands
    },
    machines() {
      return this.$store.state.machines.machines
    },
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('brands/getBrands')
    this.$store.dispatch('machines/getMachines')
  }
}
</script>

<style>
</style>
