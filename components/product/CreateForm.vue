<template>
  <div
    class="
      w-full
      h-screen
      bg-black bg-opacity-50
      absolute
      left-0
      right-0
      top-0
      bottom-0
      z-50
    "
  >
    <div class="flex justify-center items-center h-full">
      <div
        class="px-6 py-5 bg-white drop-shadow-lg rounded-lg max-w-2xl w-full"
      >
        <div class="flex flex-row justify-between items-center">
          <div v-if="form.name">Редактирование ({{ form.name }})</div>
          <div v-else>Добавление товара</div>
          <button class="px-2 py-2 group hover:bg-gray-200 rounded-md" @click="closeForm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 25 25"
              class="text-gray-400 group-hover:text-black"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0119 6.05566L5.5119 19.5557"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.0119 19.5557L5.5119 6.05566"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <form class="flex flex-col">
          content
        </form>
        <div class="flex flex-row justify-between">
          <div>
            <NuxtButton :outline="true"> Кнопка </NuxtButton>
          </div>
          <div>
            <NuxtButton> Кнопка </NuxtButton>
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
      form: 'products/getFormData',
    }),
  },
  methods: {
    closeForm() {
      this.$store.dispatch('products/setShowCreateDialog', false)
    }
  },
}
</script>

<style>
</style>
