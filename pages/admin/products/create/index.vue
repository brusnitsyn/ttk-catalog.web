<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4 flex flex-col w-1/2">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Добавить товар</h1>
      <button @click="addAttribute" class="p-1">Добавить свойство</button>
    </div>
    <div class="py-4 flex flex-col">
      <div>
        <label class="text-sm"> Наименование товара </label>
        <el-input
          placeholder="Крыло отвала"
          :value="product.name"
          @input="setProductName"
        />
      </div>
      <div class="flex flex-col flex-grow gap-y-2 pt-2">
        <div v-for="prop in product.properties" :key="prop.id">
          <div class="flex flex-col gap-y-1">
            <label>{{ prop.name }}</label>
            <input
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('products', ['product'])
    // product() {
    //   return {...this.$store.state.products.product}
    // }
    // ...mapGetters({
    //   product: 'products/getProduct',
    // }),
  },
  data() {
    return {
      attributes: [],
      form: {},
    }
  },
  methods: {
    ...mapMutations('products', ['setProductName']),
    productNameChange(value) {},
    addAttribute() {
      this.$store.dispatch('products/setShowPropertiesDialog', true)
    },
    removeAttribute() {},
  },
}
</script>

<style>
</style>
