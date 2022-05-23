<template>
  <div
    class="
      flex
      items-center
      justify-center
      absolute
      top-0
      bottom-0
      right-0
      left-0
      bg-gray-900 bg-opacity-70
      z-50
    "
  >
    <div class="p-6 bg-white rounded-lg w-full max-w-lg mx-4  ">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 md:col-span-3 space-y-1">
          <label class="text-sm">Свойство</label>
          <el-select
            v-model="productProperty.property"
            filterable
            class="w-full"
            value-key="id"
            no-data-text=""
            no-match-text="Нет подходящих свойств"
            placeholder="Выберите свойство"
          >
            <el-option
              v-for="item in properties"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-span-6 md:col-span-3 space-y-1">
          <label class="text-sm">Значение</label>
          <el-input
            placeholder="Значение"
            v-model="productProperty.value"
          ></el-input>
        </div>
        <div class="col-span-6 md:col-span-3 space-y-1">
          <el-checkbox v-model="productProperty.isDimension">
            Единица измерения?
          </el-checkbox>
        </div>
        <div class="col-span-6 md:col-span-3 space-y-1">
          <label class="text-sm">Единица измерения</label>
          <el-input
            :disabled="!productProperty.isDimension"
            v-model="productProperty.dimension"
            placeholder="Единица измерения"
          ></el-input>
        </div>
      </div>
      <div class="flex flex-row justify-between pt-5">
        <el-button type="text" @click="onCloseDialog">Отмена</el-button>
        <el-button type="success" @click="addProductProperty"
          >Добавить</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      properties: 'api/products/properties/getProperties',
    }),
  },
  data() {
    return {
      productProperty: {
        value: '',
        isDimension: false,
        dimension: '',
        property: {},
      },
    }
  },
  methods: {
    onCloseDialog() {
      this.$store.dispatch('products/setShowPropertiesDialog', false)
    },
    addProductProperty() {
      this.$store.commit('products/pushProperty', this.productProperty)
      this.onCloseDialog()
    },
  },
  mounted() {
    this.$store.dispatch('api/products/properties/fetchAllProperties')
  },
}
</script>

<style>
</style>
