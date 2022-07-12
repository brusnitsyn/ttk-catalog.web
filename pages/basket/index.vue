<template>
  <Container class="flex flex-col lg:flex-row lg:gap-x-6">
    <div class="lg:grow pt-6 lg:pt-0">
      <div class="flex justify-between items-center pb-4">
        <h1 class="text-xl font-semibold font-inter">Корзина</h1>
        <span v-if="basket.length">Всего товаров: {{ basket.length }}</span>
      </div>
      <div class="bg-gray-50 rounded-[4px] p-4 min-h-max max-h-[580px] overflow-auto overscroll-none">
        <ul v-if="basket.length" class="space-y-4 overflow-auto">
          <li v-for="item in basket" :key="item.id">
            <div class="flex flex-col lg:flex-row justify-between">
              <div class="flex flex-col lg:flex-row items-start gap-x-3.5">
                <div class="bg-gray-100 p-4 rounded-[4px]">
                  <el-image v-if="item.product.images && item.product.images[0]" fit="cover"
                    :src="item.product.images[0].url" class="w-[98px] h-[98px]" />

                  <el-image v-else fit="cover" src="/img/no-finded-image.png" class="w-[98px] h-[98px]" />
                </div>
                <div class="flex flex-col py-1.5">
                  <div class="flex flex-col py-0.5">
                    <span class="font-inter">{{ item.product.name }}</span>
                    <span class="font-inter text-sm">Артикул: {{ item.product.article }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm">Кол-во:</span>
                    <el-input-number size="small" @change="handleChange(item)" :min="1" :max="999" v-model="item.qty" />
                    <span class="font-inter font-medium pt-2">
                      {{ Number(item.price).toLocaleString() }} ₽
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center">
                <div class="flex flex-row">
                  <nuxt-link :to="{ name: 'catalog-product', query: { id: item.product.id } }" class="mr-2.5">
                    <el-button icon="el-icon-search" circle></el-button>
                  </nuxt-link>
                  <el-button icon="el-icon-share" circle @click="copyToClipboard(item)"></el-button>
                  <el-button icon="el-icon-delete" circle @click="deleteProduct(item)"></el-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-empty v-else description="Корзина пуста">
          <nuxt-link :to="{ name: 'catalog' }">
            <el-link type="primary">В каталог</el-link>
          </nuxt-link>
        </el-empty>
      </div>
    </div>
    <div v-if="basket.length" class="lg:min-w-[320px] lg:max-w-min">
      <h2 class="text-lg font-semibold font-inter pb-4 pt-4 lg:pt-0">Оформление заказа</h2>
      <div class="flex flex-col gap-y-2">
        <span v-if="!$auth.loggedIn">
          <el-link type="primary">
            <nuxt-link :to="{ name: 'auth-login' }">
              Войдите
            </nuxt-link>
          </el-link>
          в личный кабинет, чтобы ускорить оформление заказа.
        </span>
        <el-form>
          <el-form-item label="ФИО" size="small">
            <el-input v-model="form.name">

            </el-input>
          </el-form-item>
          <el-form-item label="Электронная почта" size="small">
            <el-input v-model="form.email" type="email">

            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { deepClone } from '~/helpers';
import ElImage from '~/node_modules/element-ui/lib/image'
import ElLink from '~/node_modules/element-ui/lib/link'
import ElButton from '~/node_modules/element-ui/lib/button'
import ElInput from '~/node_modules/element-ui/lib/input'
import ElForm from '~/node_modules/element-ui/lib/form'
import ElFormItem from '~/node_modules/element-ui/lib/form-item'
import ElInputNumber from '~/node_modules/element-ui/lib/input-number'
import ElEmpty from '~/node_modules/element-ui/lib/empty'
export default {
  layout: 'index',
  components: {
    ElImage, ElInputNumber, ElLink, ElInput, ElForm, ElFormItem, ElButton, ElEmpty
  },
  computed: {
    basket() {
      return deepClone(this.$store.state.basket.products)
    }
  },
  data() {
    return {
      // basket: [],
      form: {
        name: '',
        email: '',

      }
    }
  },
  async activated() {
    await this.$store.dispatch('basket/getAllProducts')
    // this.basket = deepClone(this.$store.state.basket.products)
  },
  methods: {
    handleChange(item) {
      if (item.qty === null || typeof item.qty === 'undefined')
        item.qty = 1

      if (item.product.discountPrice)
        item.price = (item.product.discountPrice * item.qty)
      else
        item.price = (item.product.actualPrice * item.qty)

      this.$store.dispatch('basket/editProduct', item)
    },
    deleteProduct(item) {
      this.$store.dispatch('basket/deleteProduct', item)
    },
    copyToClipboard(item) {
      navigator.clipboard.writeText(`https://nilparts.shop/catalog/product/${item.product.id}`)
        .then(() => {
          this.$message({
            message: 'Ссылка на товар скопирована!',
            type: 'success'
          })
        })
        .catch(err => {
          this.$message({
            message: 'Произошла ошибка при копировании ссылки',
            type: 'error'
          })
          console.log(err)
        });
    }
  }
}
</script>

<style>
</style>
