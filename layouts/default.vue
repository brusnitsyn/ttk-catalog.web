<template>
  <div>
    <Header
      class="sticky top-0 w-full bg-white bg-opacity-50 backdrop-blur-lg z-50 "
    />
    <Nuxt keep-alive/>
    <!-- <Footer /> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // computed: {
  //   ...mapGetters({
  //     openDialog: 'ui/getOpenDialog',
  //   }),
  // },
  // watch: {
  //   openDialog(newValue, oldValue) {
  //     document.body.classList.remove('overflow-hidden')
  //     if (newValue) {
  //       document.body.classList.add('overflow-hidden')
  //     }
  //   },
  // },
  data() {
    return {}
  },
}
</script>

<!-- <script>
export default {
  data() {
    return {
      styleHeader: '',
    }
  },
  methods: {
    handleScroll() {
      if (scrollY > 0) {
        this.styleHeader = 'sticky top-0 left-0 right-0 bg-white shadow-md border-b-0 bg-opacity-50 backdrop-blur-lg'
      }
      if (scrollY <= 0) {
        this.styleHeader = 'block bg-transparent shadow-none border-b'
      }
    },
  },
  beforeMount() {
    this.styleHeader = 'block bg-transparent shadow-none border-b'
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script> -->
