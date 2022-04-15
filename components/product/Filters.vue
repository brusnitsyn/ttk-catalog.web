<template>
  <Loading v-if="$fetchState.pending"> </Loading>
  <div v-else>
    <div v-if="brands">
      <h5 class="text-base font-semibold py-2">
        Производитель ({{ brands.length }})
      </h5>
      <ul>
        <li v-for="brand in brands" :key="brand.id" class="text-sm px-2 py-1">
          <a @click="sortingBrand(brand.name)" class="cursor-pointer ">
            {{ brand.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- <div v-if="machineTypes">
      <h5 class="text-base font-semibold py-2">
        Тип техники ({{ brandsLength }})
      </h5>
      <ul>
        <li
          v-for="machineType in machineTypes"
          :key="machineType.id"
          class="text-sm px-2 py-1"
        >
          <a>{{ machineType.name }}</a>
        </li>
      </ul>
    </div> -->

    <div v-if="machines">
      <h5 class="text-base font-semibold py-2">
        Техника ({{ machines.length }})
      </h5>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      brands: 'brands/getBrands',
      machines: 'machines/getMachines',
    }),
  },
  methods: {
    sortingBrand(brandName) {
      this.$store.dispatch('products/filterBrand', brandName)
    },
  },
  async fetch() {
    await this.$store.dispatch('brands/fetchAllBrands')
    await this.$store.dispatch('machines/fetchAllMachines')
  },
  mounted() {
    // this.$store.dispatch('products/filterProducts')
  },
}
</script>

<style>
</style>
