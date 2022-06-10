<template>
  <el-input @input="handleSearch" @keyup.enter.native="goPageResult" placeholder="Наименование" v-model="search"
    class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <!-- <div class="relative flex flex-row group border rounded-lg">
    <div
      class="
        pointer-events-none
        bg-white
        border-gray-300
        group-hover:border-gray-400
        flex flex-col
        justify-center
        pl-2.5
      "
    >
      <svg
        class="w-6 mb-0.5 text-gray-400 group-hover:text-gray-500"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.2666 23.7667C9.2666 15.7585 15.7585 9.26666 23.7666 9.26666C31.7748 9.26666 38.2666 15.7585 38.2666 23.7667C38.2666 31.7749 31.7748 38.2667 23.7666 38.2667C15.7585 38.2667 9.2666 31.7749 9.2666 23.7667V23.7667ZM23.7666 6.26666C14.1016 6.26666 6.2666 14.1017 6.2666 23.7667C6.2666 33.4317 14.1016 41.2667 23.7666 41.2667C28.059 41.2667 31.9906 39.7213 35.035 37.1565L40.506 42.6273C41.0918 43.2131 42.0414 43.2131 42.6272 42.6273C43.213 42.0415 43.213 41.0919 42.6272 40.5061L37.1564 35.0351C39.7212 31.9907 41.2666 28.0591 41.2666 23.7667C41.2666 14.1017 33.4316 6.26666 23.7666 6.26666V6.26666Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <input
      type="search"
      @input="handleSearch"
      @keyup.enter="goPageResult"
      :value="search"
      class="
        outline-none
        pl-3.5
        pr-2
        py-2.5
        bg-transparent
        placeholder-gray-400
        group-hover:border-gray-400 group-hover:placeholder-gray-600
        group-select:border-gray-400 group-select:placeholder-gray-600
        w-full
        font-inter
      "
      placeholder="Поиск товара"
    />
  </div> -->
</template>

<script>
import { debounce } from '~/helpers/index'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleSearch: debounce(function (e) {
      let filter = { 'search': this.search }
      this.$store.dispatch('products/fetchProductsByFilter', filter)
    }, 500),
    goPageResult() {
      this.$router.push('/catalog')
    }
  },
}
</script>
