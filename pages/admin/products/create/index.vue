<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <div class="pt-6 px-4">
    <h1 class="text-2xl font-semibold">Добавить товар</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-2">
      <div class="flex flex-col gap-y-2">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-y-2 md:gap-x-2">
          <div class="col-span-6 lg:col-span-3">
            <label class="text-sm">Наименование</label>
            <el-input placeholder="Крыло отвала" v-model="tempProduct.name" />
          </div>
          <div class="col-span-6 lg:col-span-3">
            <label class="text-sm">Артикул</label>
            <el-input
              placeholder="РЗЗ.65.01.002"
              v-model="tempProduct.article"
            />
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Производитель</label>
            <el-select
              v-model="tempProduct.brandId"
              filterable
              class="w-full"
              @change="selectBrand"
              no-data-text="Нет данных"
              no-match-text="Производитель не найден"
              placeholder="Выберите производителя"
            >
              <el-option
                v-for="item in brands"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Тип техники</label>
            <el-select
              v-model="selectedMachineType"
              :disabled="!(tempProduct.brandId != null)"
              filterable
              @change="selectMachineType"
              class="w-full"
              no-data-text="Нет данных"
              no-match-text="Тип техники не найден"
              placeholder="Выберите тип техники"
            >
              <el-option
                v-for="item in machineTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label class="text-sm">Техника</label>
            <el-select
              v-model="tempProduct.machines"
              :disabled="!(selectedMachineType != null)"
              filterable
              class="w-full"
              multiple
              value-key="id"
              no-data-text="Нет данных"
              no-match-text="Техника не найдена"
              placeholder="Выберите технику"
            >
              <el-option
                v-for="item in machines"
                :key="item.id"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-span-6">
            <label class="text-sm">Описание</label>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="Данное поле не обязательное"
              v-model="tempProduct.description"
            >
            </el-input>
          </div>
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
                <el-link type="danger" @click="handleRemoveProperty(prop)">
                  Удалить
                </el-link>
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
          :on-change="onChangeUploaderProductImages"
          :multiple="true"
          :auto-upload="false"
          :file-list="tempProduct.images"
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
                @click="handleRemoveProductImage(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </div>
    </div>
    <el-button type="success" @click="sendDataProductToUpload">Добавить</el-button>
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
      brands: 'brands/getBrands',
      machineTypes: 'machineTypes/getMachineTypesForBrand',
      machines: 'machines/getMachines',
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
      selectedMachineType: null,
      tempProduct: {
        images: [],
        machines: []
      },
    }
  },
  methods: {

    sendDataProductToUpload() {
      this.$store.dispatch('products/pushSingleProduct', this.tempProduct)
    },

    selectBrand(brandId) {
      this.selectedMachineType = null
      this.tempProduct.machines = []
      this.$store.dispatch('machineTypes/setBrandId', brandId)
    },
    selectMachineType(machineTypeId) {
      this.tempProduct.machines = []
      this.$store.dispatch('machines/fetchSingleMachineForMachineType', machineTypeId)
    },


    addAttribute() {
      this.$store.dispatch('products/setShowPropertiesDialog', true)
    },
    handleRemoveProperty(property) {
      this.$store.commit('products/removeProperty', property)
    },
    handleRemoveProductImage(file) {
      let files = this.tempProduct.images
      this.tempProduct.images.forEach((img, index, obj) => {
        if (!img.raw) {
          if (img.uid === file.uid) {
            files.splice(index, 1)
          }

          return
        }
        if (img.raw.uid === file.raw.uid) {
          files.splice(index, 1)
        }
      })

      this.$refs.uploaderProductImages.fileList = files
    },
    onChangeUploaderProductImages(file, fileList) {
      this.tempProduct.images = []
      fileList.forEach((file) => {
        this.tempProduct.images.push(file)
      })
    },
  },
  mounted() {
    this.$store.dispatch('brands/fetchAllBrands')
    this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    // this.$store.dispatch('machines/fetchAllMachines')
  }
}
</script>

<style>
</style>
