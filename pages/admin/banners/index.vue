<template>
  <div class="pt-6 px-4 flex flex-col">
    <div class="flex justify-between items-center">
      <h1>Баннеры</h1>
      <el-button @click="dialogVisible = !dialogVisible">
        Добавить слайд
      </el-button>
    </div>
    <div class="w-full pt-4 lg:mx-auto lg:max-w-7xl lg:px-4">
      <client-only>
        <swiper class="rounded-none lg:rounded-lg h-72 lg:h-[420px]">
          <swiper-slide v-for="banner in banners" :key="banner.id">
            <div
              class="h-full"
              :style="{
                backgroundImage: `url(${banner.image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <div class="flex justify-end px-2 py-1 lg:px-5 lg:py-4">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteBanner(banner)"
                ></el-button>
              </div>
              <div
                class="
                  flex flex-col
                  h-full
                  justify-end
                  px-2
                  py-1
                  lg:gap-y-4 lg:px-5 lg:py-4
                "
              >
                <span
                  class="
                    font-inter
                    text-xl
                    lg:text-3xl
                    font-bold
                    uppercase
                    text-white
                    w-[420px]
                  "
                >
                  {{ banner.header }}
                </span>
                <a
                  :href="banner.url"
                  class="font-inter text-xl font-bold text-orange-400"
                >
                  ПОДРОБНЕЕ
                </a>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <el-dialog title="Добавить слайд" :visible.sync="dialogVisible" width="80%">
      <el-form label-position="top">
        <el-form-item label="Заголовок" prop="header">
          <el-input v-model="banner.header" />
        </el-form-item>

        <el-form-item label="Ссылка для кнопки действия" prop="header">
          <el-input placeholder="Адрес сайта" v-model="banner.url">
            <template slot="prepend">https://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Изображение">
          <el-upload
            class="image-uploader"
            action=" "
            ref="uploaderImage"
            :on-change="handleUploaderImageSuccess"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img v-if="previewImage" :src="previewImage" class="image" />
            <i v-else class="el-icon-plus image-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="uploadBanner"> Добавить </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ElButton from '@/node_modules/element-ui/lib/button'
import ElForm from '@/node_modules/element-ui/lib/form'
import ElInput from '@/node_modules/element-ui/lib/input'
import ElFormItem from '@/node_modules/element-ui/lib/form-item'
import ElUpload from '@/node_modules/element-ui/lib/upload'
import ElDialog from '@/node_modules/element-ui/lib/dialog'

export default {
  components: {
    ElButton, ElForm, ElInput, ElFormItem, ElUpload, ElDialog
  },
  computed: {
    ...mapGetters({
      banners: 'banners/getBanners',
    }),
  },
  data() {
    return {
      dialogVisible: false,
      banner: {
        header: '',
        image: File,
        url: '',
      },
      previewImage: '',
    }
  },
  methods: {
    handleUploaderImageSuccess(file, fileList) {
      this.$refs.uploaderImage.clearFiles()
      this.banner.image = file.raw
      this.previewImage = URL.createObjectURL(file.raw)
    },
    uploadBanner() {
      this.$store.dispatch('banners/postBanner', this.banner)
      this.dialogVisible = false
    },
    deleteBanner(banner) {
      this.$store.dispatch('banners/deleteBanner', banner)
    }
  },
  async fetch() {
    await this.$store.dispatch('banners/fetchAllBanners')
  },
  fetchOnServer: false,
}
</script>

<style>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-uploader .el-upload:hover {
  border-color: #409eff;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.image {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
