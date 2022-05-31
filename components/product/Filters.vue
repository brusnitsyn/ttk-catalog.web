<template>
  <div class="flex flex-col items-stretch border rounded-md">
    <!-- <h4 class="font-inter font-semibold pt-2 px-2">Фильтры</h4> -->
    <el-collapse :class="{'mb-2' : Object.entries(filters).length}">
      <el-collapse-item title="Производитель" name="1" class="text-left px-2">
        <div class="flex flex-col justify-start items-start">
          <el-radio-group v-model="filters.brand">
            <div class="flex flex-col gap-y-2.5 px-1">
              <el-radio v-for="brand in brands" :key="brand.id" :label="brand.id">{{ brand.name }}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Тип техники" name="2" class="text-left px-2">
        <div class="flex flex-col justify-start items-start">
          <el-radio-group v-model="filters.type">
            <div class="flex flex-col gap-y-2.5 px-1">
              <el-radio v-for="machineType in machineTypes" :key="machineType.id" :label="machineType.id">{{ machineType.name }}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <!-- <el-collapse-item title="Техника" name="3" class="text-left px-2">
        <div class="flex flex-col justify-start items-start">
          <el-link :underline="false" v-for="machine in machinesForType" :key="machine.id"
            @click="filters.machine = machine.id">
            {{ machine.name }}
          </el-link>
        </div>
      </el-collapse-item> -->
    </el-collapse>

    <div v-if="Object.entries(filters).length" class="flex flex-col gap-y-2 px-2 pb-2">
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      filters: {},
    }
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
    applyFilters() {
      this.$store.dispatch('products/fetchProductsByFilter', this.filters)
    },
    resetFilters() {
      this.filters = {}
      this.$store.dispatch('products/fetchProductsByFilter')
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
.el-collapse {
  border-top: 0px !important;
}
</style>
