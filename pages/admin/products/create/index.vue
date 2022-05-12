<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4 flex flex-col w-1/2">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Добавить товар</h1>
      <button @click="addAttribute" class="p-1">
        Добавить свойство
      </button>
    </div>
    <div class="py-4 flex flex-col">
      <div>
        <label for="name"> Наименование товара </label>
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
          placeholder="Крыло отвала"
          type="text"
          :value="product.name"
        />
      </div>
      <div class="flex flex-col flex-grow gap-y-2">
        <div v-for="attribute in attributes" :key="attribute.key">
          <div class="flex flex-col gap-y-1">
            <label>{{ attribute.name }}</label>
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
              v-model="attribute.value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
    }),
  },
  data() {
    return {
      attributes: [],
      form: {},
    }
  },
  methods: {
    productNameChange(value) {},
    addAttribute() {
      const item = {
        name: 'Стоимость',
        value: '',
        isDimension: true,
        dimension: 'руб.',
      }
      this.attributes.push(item)
    },
    removeAttribute() {},
  },
}
</script>

<style>
</style>
