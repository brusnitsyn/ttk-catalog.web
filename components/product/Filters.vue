<template>
  <div class="flex flex-col items-stretch border rounded-[4px]">
    <el-collapse :class="{ 'mb-2': Object.entries(storeFilters).length }" v-model="activeFilter">
      <el-collapse-item title="Производитель" name="1" class="text-left px-2">
        <div class="flex flex-col justify-start items-start h-48 overflow-y-auto">
          <el-checkbox-group @change="changeFilters" v-model="filters.brand">
            <div class="flex flex-col gap-y-2.5 px-1 ">
              <el-checkbox class="break-words" v-for="brand in brands" :key="brand.id" :label="brand.id">
                {{ brand.name }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Тип техники" name="2" class="text-left px-2">
        <div class="flex flex-col justify-start items-start h-full max-h-52 overflow-y-auto">
          <el-checkbox-group @change="changeFilters" v-model="filters.type">
            <div class="flex flex-col gap-y-2.5 px-1 break-words max-w-[200px]">
              <el-checkbox v-for="machineType in machineTypes" :key="machineType.id" :label="machineType.id">
                {{ machineType.name }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Техника" name="3" class="text-left px-2">
        <div class="flex flex-col justify-start items-start h-full max-h-52 overflow-y-auto">
          <el-checkbox-group @change="changeFilters" v-model="filters.machine">
            <div class="flex flex-col gap-y-2.5 px-1 break-words max-w-[200px]">
              <el-checkbox v-for="machine in machines" :key="machine.id" :label="machine.id">
                {{ machine.name }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div v-if="Object.entries(storeFilters).length" class="flex flex-col gap-y-2 px-2 pb-2">
      <div>
        <el-button @click="applyFilters" class="w-full" type="primary">
          Применить
        </el-button>
      </div>
      <div>
        <el-button class="w-full" @click="resetFilters">
          Сбросить
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { deepClone, } from '~/helpers'
export default {
  data() {
    return {
      filters: {
        brand: [],
        type: [],
        machine: []
      },
      activeFilter: ['1']
    }
  },
  computed: {
    ...mapGetters({
      brands: 'brands/getBrands',

      machineTypesForBrand: 'machineTypes/getMachineTypesForBrand',
      machineTypes: 'machineTypes/getMachineTypes',

      machinesForType: 'machines/getMachinesForType',
      machines: 'machines/getMachines',

      storeFilters: 'api/products/filters/getFilters'
    }),
  },
  watch: {
    storeFilters(filters) {
      const q = Object.entries(Object.assign({}, filters))
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

      const path = `${this.$route.path}?${q}`
      this.$router.push(path)
    }
  },
  methods: {
    ...mapActions({
      addToFilter: 'api/products/filters/addFilter',
      storeApplyFilters: 'products/fetchProductsByFilter'
    }),

    changeFilters() {
      let actualFilters = deepClone(this.filters)
      for (let filter in actualFilters) {
        if (!actualFilters[filter].length)
          delete actualFilters[filter]
      }

      this.$store.commit('api/products/filters/setFilters', actualFilters)
    },

    applyFilters() {
      this.storeApplyFilters(this.storeFilters)
      $nuxt.$emit('drawer-filters-visibly');
    },

    resetFilters() {
      this.filters = {
        brand: [],
        type: []
      }
      this.$store.commit('api/products/filters/clearFilters')
      this.storeApplyFilters()
    },
  },
  async fetch() {
    await this.$store.dispatch('brands/fetchAllBrands')
    await this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    await this.$store.dispatch('machines/fetchAllMachines')
  },
  mounted() {
    //this.filters = this.$router.query
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

<style lang="scss" scoped>
::v-deep .el-collapse {
  border-top: 0px;
  border-bottom: 0px;
}
</style>
