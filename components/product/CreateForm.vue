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
          <div class="col-span-6 md:col-span-6 space-y-1">
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
            <label for="product-originalArticle" class="text-sm"
              >Оригинальный артикул</label
            >
            <input
              type="text"
              v-model="form.originalArticle"
              name="product-originalArticle"
              id="product-originalArticle"
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
          <div class="col-span-6 md:col-span-3 space-y-1">
            <label for="product-discountPrice" class="text-sm"
              >Стоимость по акции</label
            >
            <input
              type="text"
              v-model="form.discountPrice"
              name="product-discountPrice"
              id="product-discountPrice"
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
            <label for="product-diameter" class="text-sm">Диаметр</label>
            <input
              type="text"
              v-model="form.diameter"
              name="product-diameter"
              id="product-diameter"
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
            <label for="product-thickness" class="text-sm">Толщина</label>
            <input
              type="text"
              v-model="form.thickness"
              name="product-thickness"
              id="product-thickness"
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

          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-hole" class="text-sm">Отверстие</label>
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
          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-mountingHole" class="text-sm"
              >Крепежное отверстие</label
            >
            <input
              type="text"
              name="product-mountingHole"
              v-model="form.mountingHole"
              id="product-mountingHole"
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
          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-captureWidth" class="text-sm"
              >Ширина захвата</label
            >
            <input
              type="text"
              name="product-captureWidth"
              v-model="form.captureWidth"
              id="product-captureWidth"
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
          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-thread" class="text-sm">Резьба</label>
            <input
              type="text"
              name="product-thread"
              v-model="form.thread"
              id="product-thread"
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
          <div class="col-span-6 md:col-span-6 space-y-1">
            <label for="product-distanceBetweenHoles" class="text-sm"
              >Расстояние между отверстиями</label
            >
            <input
              type="text"
              name="product-distanceBetweenHoles"
              v-model="form.distanceBetweenHoles"
              id="product-distanceBetweenHoles"
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
            <el-upload
              class="avatar-uploader"
              action=" "
              name="imagePreview"
              ref="uploaderImagePreview"
              :on-change="handleUploaderPreviewSuccess"
              :before-upload="beforePreviewUpload"
              :auto-upload="false"
              :show-file-list="false"
            >
              <img v-if="previewImage" :src="previewImage" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <div class="border-t col-span-6 border-gray-300 pt-4">
            <label
              for="carouselImages"
              class="form-label inline-block mb-2 text-gray-700"
            >
              Дополнительные изображения
            </label>
            <el-upload
              action=" "
              name="carouselImages"
              ref="uploaderCarouselImages"
              list-type="picture-card"
              :on-change="onChangeUploaderCarouselImages"
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
      form: {
        name: null,
        article: null,
        originalArticle: null,
        actualPrice: null,
        discountPrice: null,
        weight: null,
        width: null,
        diameter: null,
        thickness: null,
        height: null,
        length: null,
        hole: null,
        mountingHole: null,
        captureWidth: null,
        thread: null,
        distanceBetweenHoles: null,
        description: null,
        previewImage: '',
      },
      previewImage: '',
    }
  },
  computed: {
    ...mapGetters({
      product: 'products/getProduct',
      brands: 'brands/getBrands',
      machines: 'machines/getMachines',
    }),
  },
  watch: {
    // product: function (value) {
    //   this.form = Object.assign({}, value)
    // },
  },
  methods: {
    closeForm() {
      this.$store.dispatch('products/setShowCreateDialog', false)
    },
    beforePreviewUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isPNG) {
        this.$message.error('Avatar picture must be PNG format!')
      }
      return isJPG && isPNG
    },
    handleUploaderPreviewSuccess(file, fileList) {
      this.$refs.uploaderImagePreview.clearFiles()
      this.form.previewImage = file
      this.previewImage = URL.createObjectURL(file.raw)
    },

    handleRemoveCarouselImages(file) {
      let files = this.form.carouselImages
      this.form.carouselImages.forEach((img, index, obj) => {
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

      this.$refs.uploaderCarouselImages.fileList = files
    },
    onChangeUploaderCarouselImages(file, fileList) {
      this.form.carouselImages = []
      fileList.forEach((file) => {
        this.form.carouselImages.push(file)
      })
    },

    addProduct() {
      this.$store.dispatch('products/pushSingleProduct', this.form)
    },
  },
  // activated() {
  //   if (this.product) this.form = Object.assign({}, this.product)
  // },
  mounted() {
    this.$store.dispatch('machines/fetchAllMachines')
    this.$store.dispatch('brands/fetchAllBrands')
  },
  created() {
    this.form = Object.assign({}, this.product)
    this.previewImage = this.form.previewImage
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
