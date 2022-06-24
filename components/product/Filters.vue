<template>
  <div class="flex flex-col items-stretch border rounded-[4px]">
    <el-collapse :class="{ 'mb-2': Object.entries(storeFilters).length }" v-model="activeFilter">
      <el-collapse-item title="Производитель" name="1" class="text-left px-2">
        <el-checkbox-group @change="changeFilters" v-model="filters.brand" class="flex flex-col">
          <el-checkbox v-for="brand in brands" :key="brand.id" :label="brand.id">
            {{ brand.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="Тип техники" name="2" class="text-left px-2">
        <el-checkbox-group @change="changeFilters" v-model="filters.type" class="flex flex-col">
          <el-checkbox v-for="machineType in machineTypes" :key="machineType.id" :label="machineType.id">
            {{ machineType.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="Техника" name="3" class="text-left px-2">
        <el-checkbox-group @change="changeFilters" v-model="filters.machine" class="flex flex-col">
          <el-checkbox v-for="machine in machines" :key="machine.id" :label="machine.id">
            {{ machine.name }}
          </el-checkbox>
        </el-checkbox-group>
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
import('~/assets/css/element-index.scss')

const ElCollapse = () => import('~/node_modules/element-ui/lib/collapse')
const ElCollapseItem = () => import('~/node_modules/element-ui/lib/collapse-item')
const ElCheckboxGroup = () => import('~/node_modules/element-ui/lib/checkbox-group')
const ElCheckbox = () => import('~/node_modules/element-ui/lib/checkbox')
const ElButton = () => import('~/node_modules/element-ui/lib/button')

import { mapGetters, mapActions } from 'vuex'
import { deepClone } from '~/helpers'
export default {
  components: {
    ElCollapse, ElCollapseItem, ElCheckboxGroup, ElCheckbox, ElButton
  },
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

::v-deep .el-checkbox__label {
  max-width: 180px;
  width: 100%;
  word-break: break-all;
}
</style>
