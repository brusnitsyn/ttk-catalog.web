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
      <div class="px-6 py-5 bg-white drop-shadow-lg rounded-lg max-w-2xl w-full">
        <div class="flex flex-row justify-between">
          <div>
            Window
          </div>
          <div>
            X
          </div>
        </div>
        <form class="flex flex-col">
          content
        </form>
        <div>
          footer
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    preventDefault: function (e) {
      e = e || window.event
      if (e.preventDefault) e.preventDefault()
      e.returnValue = false
    },
    disableScroll: function () {
      window.addEventListener('DOMMouseScroll', this.preventDefault, false)
      document.addEventListener('wheel', this.preventDefault, {
        passive: false,
      })
      document.addEventListener('scroll', this.preventDefault, {
        passive: false,
      })
    },
    enableScroll: function () {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
      document.removeEventListener('wheel', this.preventDefault, {
        passive: false,
      })
      document.removeEventListener('scroll', this.preventDefault, {
        passive: false,
      })
    },
  },
  mounted() {
    this.disableScroll()
  }
}
</script>

<style>
</style>
