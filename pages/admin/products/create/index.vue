<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4">
    <h1 class="text-2xl font-semibold">Добавить товар</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-2">
      <div class="flex flex-col gap-y-2">
        <div>
          <label class="text-sm">Наименование</label>
          <el-input placeholder="Крыло отвала" v-model="tempProduct.name" />
        </div>
        <div>
          <label class="text-sm">Артикул</label>
          <el-input placeholder="РЗЗ.65.01.002" v-model="tempProduct.article" />
        </div>
      </div>
      <div class="bg-white px-3 py-2 rounded-md">
        <div class="flex justify-between items-center">
          <h2>Свойства</h2>
          <el-button type="text" @click="addAttribute">
            Добавить свойство
          </el-button>
        </div>
        <ol v-if="product.properties.length" class="pt-2 space-y-0.5">
          <li v-for="prop in product.properties" :key="prop.id">
            <div class="flex flex-row justify-between">
              <span class="font-inter text-sm">{{ prop.property.name }}</span>
              <div
                class="flex-grow border-b-2 border-dotted mb-1.5 mx-1.5"
              ></div>
              <div class="flex gap-x-1">
                <span class="font-inter text-sm font-semibold">
                  {{ prop.value }}
                </span>
                <span
                  v-if="prop.isDimension"
                  class="font-inter text-sm font-semibold"
                >
                  {{ prop.dimension }}
                </span>
              </div>
            </div>
          </li>
        </ol>
        <h2 class="pt-3 pb-1">Изображения</h2>
        <el-upload
          action=" "
          name="carouselImages"
          ref="uploaderCarouselImages"
          class="mb-3"
          list-type="picture-card"
          :on-change="onChangeUploaderCarouselImages"
          :multiple="true"
          :auto-upload="false"
          :file-list="tempProduct.carouselImages"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-delete"
                @click="handleRemoveCarouselImages(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
  <!-- <div class="pt-6 px-4 flex flex-col">
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
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  // watch: {
  //   product() {
  //     this.tempProduct = Object.assign({}, this.product)
  //   }
  // },
  computed: {
    tempProduct() {
      return Object.assign({}, this.product)
    },

    ...mapGetters({
      product: 'products/getProduct',
    }),

    //...mapState('products', ['product']),
    // product() {
    //   return {...this.$store.state.products.product}
    // }
    // ...mapGetters({
    //   product: 'products/getProduct',
    // }),
  },
  data() {
    return {
      tempProduct: {
        carouselImages: [],
      },
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
    handleRemoveCarouselImages(file) {
      let files = this.tempProduct.carouselImages
      this.tempProduct.carouselImages.forEach((img, index, obj) => {
        if (!img.raw) {
          console.log(img)
          if (img.uid === file.uid) {
            files.splice(index, 1)
          }

          return
        }
        if (img.raw.uid === file.raw.uid) {
          files.splice(index, 1)
        }
      })

      this.$refs.uploaderCarouselImages.fileList = files
    },
    onChangeUploaderCarouselImages(file, fileList) {
      this.tempProduct.carouselImages = []
      fileList.forEach((file) => {
        this.tempProduct.carouselImages.push(file)
      })
    },
  },
}
</script>

<style>
</style>
