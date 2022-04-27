<template>
  <div
    class="
      bg-black bg-opacity-50
      absolute
      left-0
      right-0
      top-0
      bottom-0
      z-50
      px-2
      py-4
      flex
      justify-center
      items-center
    "
  >
    <div
      class="
        px-6
        py-5
        bg-white
        drop-shadow-lg
        rounded-lg
        flex flex-col
        max-w-2xl max-h-full
      "
    >
      <div
        class="
          pb-3.5
          flex flex-row
          justify-between
          items-center
          border-b border-gray-300
        "
      >
        <div v-if="form.name">Редактирование ({{ form.name }})</div>
        <div v-else>Добавление товара</div>
        <button
          class="px-2 py-2 group hover:bg-gray-200 rounded-md"
          @click="closeForm"
        >
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
      <form class="p-3.5 flex flex-col overflow-auto scrollbar">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-name" class="text-sm">Наименование</label>
            <input
              type="text"
              name="product-name"
              id="product-name"
              v-model="form.name"
              placeholder="Крыло отвала"
              required
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
            />
          </div>

          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-article" class="text-sm">Артикул</label>
            <input
              type="text"
              v-model="form.article"
              name="product-article"
              id="product-article"
              placeholder="РЗЗ.65.01.002"
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
            />
          </div>

          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-brands" class="text-sm">Бренд</label>
            <multiselect
              label="name"
              track-by="name"
              placeholder="Выберите бренд"
              select-label="[Enter] Выбрать"
              selected-label="Выбрано"
              deselect-label="Отменить выбор"
              v-model="form.brand"
              :options="brands"
            >
              <span slot="noResult">Нет результатов</span>
            </multiselect>
          </div>

          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-machines" class="text-sm">Техника</label>
            <multiselect
              label="name"
              track-by="name"
              placeholder="Выберите технику"
              select-label="[Enter] Выбрать"
              selected-label="Выбрано"
              :multiple="true"
              deselect-label="Отменить выбор"
              v-model="form.machines"
              :options="machines"
            >
              <span slot="noResult">Нет результатов</span>
            </multiselect>
          </div>

          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-weight" class="text-sm">Масса</label>
            <input
              type="text"
              name="product-weight"
              v-model="form.weight"
              id="product-weight"
              placeholder="0000.00"
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
            />
          </div>

          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-actualPrice" class="text-sm">Стоимость</label>
            <input
              type="text"
              v-model="form.actualPrice"
              name="product-actualPrice"
              id="product-actualPrice"
              placeholder="0000000.00"
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
            />
          </div>

          <div class="col-span-2 md:col-span-2 space-y-1">
            <label for="product-length" class="text-sm">Длина</label>
            <input
              type="text"
              v-model="form.length"
              name="product-length"
              id="product-length"
              placeholder="0000000.00"
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
            />
          </div>
          <div class="col-span-2 md:col-span-2 space-y-1">
            <label for="product-width" class="text-sm">Ширина</label>
            <input
              type="text"
              v-model="form.width"
              name="product-width"
              id="product-width"
              placeholder="0000000.00"
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
            />
          </div>
          <div class="col-span-2 md:col-span-2 space-y-1">
            <label for="product-height" class="text-sm">Высота</label>
            <input
              type="text"
              v-model="form.height"
              name="product-height"
              id="product-height"
              placeholder="0000000.00"
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
            />
          </div>
          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-hole" class="text-sm"
              >Отверстие (опционально)</label
            >
            <input
              type="text"
              name="product-hole"
              v-model="form.hole"
              id="product-hole"
              placeholder="1 отверстие - 20 мм, 4 отверстий - 10 мм"
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
            />
          </div>

          <div class="col-span-6 border-t border-gray-300 pt-4">
            <label
              for="imagePreview"
              class="form-label inline-block mb-2 text-gray-700"
              >Главное изображение</label
            >
            <input
              class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700
                focus:bg-white
                focus:border-blue-600
                focus:outline-none
              "
              type="file"
              @change="handleImagePreviewUpload"
              id="imagePreview"
              ref="previewImage"
            />
          </div>
          <el-upload
            class="border-t col-span-6 border-gray-300 pt-4"
            action=" "
            list-type="picture-card"
            :on-change="onChangeUploader"
            :multiple="true"
            :auto-upload="false"
            :file-list="form.carouselImages"
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
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </form>
      <div class="pt-3.5 flex flex-row justify-end border-t border-gray-300">
        <!-- <div>
          <NuxtButton :outline="true"> Отмена </NuxtButton>
        </div> -->
        <div>
          <button @click="addProduct">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      form: {},
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  computed: {
    ...mapGetters({
      preDataForm: 'products/getProduct',
      newProductForm: 'products/getFormData',
      brands: 'brands/getBrands',
      machines: 'machines/getMachines',
    }),
  },
  methods: {
    closeForm() {
      this.$store.dispatch('products/setShowCreateDialog', false)
    },
    handleImagePreviewUpload(e) {
      this.form.previewImage = e.target.files[0]
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    onChangeUploader(file) {
      console.log(file)
      this.$store.commit('products/pushProductCarouselImage', file)
    },

    addProduct() {
      this.$store.dispatch('products/pushSingleProduct', this.form)
    },
  },
  mounted() {
    this.$store.dispatch('machines/fetchAllMachines')
    this.$store.dispatch('brands/fetchAllBrands')

    this.form = Object.assign({}, this.preDataform)
    //if (this.preDataForm != undefined) this.form = Object.assign({}, this.preDataform)
    //else this.form = Object.assign({}, this.newProductForm)
  },
  created() {

  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 16px;
}
.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  margin-top: 12px;
  margin-bottom: 12px;
  background: #e5e7eb;
}
.scrollbar::-webkit-scrollbar-thumb {
  /* background: #9ca3af; */
  background: #d1d5db;
  border-radius: 100vh;
  border: 3px solid #e5e7eb;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
