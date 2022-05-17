<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4 flex flex-col">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Добавить товар</h1>
      <button @click="addAttribute" class="p-1">Добавить свойство</button>
    </div>
    <div
      class="
        py-4
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        md:gap-x-2
        lg:gap-x-4
      "
    >
      <div>
        <label class="text-sm"> Наименование товара </label>
        <el-input placeholder="Крыло отвала" v-model="tempProduct.name" />
      </div>
      <div>
        <label class="text-sm">Артикул</label>
        <el-input placeholder="РЗЗ.65.01.002" v-model="tempProduct.article" />
      </div>
    </div>
    <div class="flex flex-col flex-grow gap-y-2 pt-2">
      <h2>Свойства</h2>
      <div v-for="prop in product.properties" :key="prop.id">
        <div class="flex flex-col gap-y-1">
          <label>{{ prop.property.name }}</label>
          <el-input v-model="prop.value" />
          <!-- <input
              class="
                p-2
                focus:outline-none
                focus:border-opacity-0
                focus:ring-2
                focus:ring-accent
                border border-gray-300
                rounded-lg
                bg-gray-100
                shadow
                w-full
              "
              type="text"
              v-model="prop.value"
            /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  watch: {
    product() {
      this.tempProduct = Object.assign({}, this.product)
    }
  },
  computed: {

    tempProduct() {
      return Object.assign({}, this.product)
    },

    ...mapState('products', ['product']),
    // product() {
    //   return {...this.$store.state.products.product}
    // }
    // ...mapGetters({
    //   product: 'products/getProduct',
    // }),
  },
  data() {
    return {
      tempProduct: {}
    }
  },
  methods: {
    // ...mapMutations('products', ['setProductName']),
    // updateProductName(value) {
    //   this.$store.commit('products/setProductName', value.target.value)
    // },
    addAttribute() {
      this.$store.dispatch('products/setShowPropertiesDialog', true)
    },
    removeAttribute() {},
  },
}
</script>

<style>
</style>
