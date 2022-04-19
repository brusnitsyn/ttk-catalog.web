<template>
  <button
    class="px-4 py-3 rounded-lg select-none"
    :class="{
      'bg-transparent': outline,
      'bg-orange-600': !outline,
      'text-white': !outline,
      'text-orange-400': outline,
      border: outline,
      'border-orange-400': outline,
      'hover:text-orange-600': outline,
      'hover:border-orange-600': outline
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    outline: Boolean,
  },
  data() {
    return {
      buttonStyle: '',
    }
  },
  // watch: {
  //   outline(value) {
  //     if (value) {
  //       console.log(value)
  //       this.buttonStyle = 'bg-transparent border border-orange-600'
  //     } else {

  //     }
  //   }
  // }
}
</script>

<style>
</style>
