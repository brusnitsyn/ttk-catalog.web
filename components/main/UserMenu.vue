<template>
  <div class="flex border rounded-[4px] min-h-[460px] max-h-min h-full w-full absolute bg-white shadow-lg">
    <div class="px-6 py-6 bg-gray-50 min-w-[320px]">
      <div class="flex flex-col justify-between h-full">
        <span>Корзина</span>
        <div
          class="grow bg-gray-100 rounded-[4px] space-y-2 my-2 px-3 py-2 min-h-[360px] max-h-min overflow-auto overscroll-none">
          <ul v-if="basket.length" class="overflow-auto">
            <li v-for="item in basket" :key="item.id" class="text-sm">
              <div class="flex justify-between py-1.5">
                <div class="flex gap-x-4 items-center overflow-hidden overscroll-none">
                  <el-image v-if="item.product.images && item.product.images.length > 0" fit="contain"
                    :src="item.product.images[0].url" :alt="item.product.name" class="h-10" />
                  <el-image v-else fit="contain" src="/img/no-finded-image.png" :alt="item.product.name" class="h-10" />
                  <div class="flex flex-col items-start truncate w-full">
                    <span class="">{{ item.product.name }}</span>
                    <el-link @click="removeProduct(item)">Удалить</el-link>
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
        <el-link type="primary" class=" self-start" icon="el-icon-shopping-cart-2">
          <nuxt-link :to="{ name: 'basket' }">
            В корзину
          </nuxt-link>
        </el-link>
      </div>
    </div>
    <div class="px-6 py-6 grow min-h-[360px] max-h-min">
      <div class="flex flex-col h-full">
        <div v-if="$auth.loggedIn" class="flex justify-between items-center">
          <span>{{ $auth.user.name }}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2465 12.5881C12.8699 12.5881 14.9965 10.4615 14.9965 7.83813C14.9965 5.21478 12.8699 3.08813 10.2465 3.08813C7.62317 3.08813 5.49652 5.21478 5.49652 7.83813C5.49652 10.4615 7.62317 12.5881 10.2465 12.5881Z"
              stroke="currentColor" stroke-miterlimit="10" />
            <path
              d="M3.0473 16.7443C3.77683 15.4805 4.8262 14.431 6.08994 13.7013C7.35368 12.9716 8.78724 12.5874 10.2465 12.5874C11.7058 12.5874 13.1394 12.9716 14.4031 13.7013C15.6668 14.431 16.7162 15.4805 17.4457 16.7443"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div v-else class="flex flex-col items-center justify-center h-full">
          <div class="flex flex-col items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.2465 12.5881C12.8699 12.5881 14.9965 10.4615 14.9965 7.83813C14.9965 5.21478 12.8699 3.08813 10.2465 3.08813C7.62317 3.08813 5.49652 5.21478 5.49652 7.83813C5.49652 10.4615 7.62317 12.5881 10.2465 12.5881Z"
                stroke="currentColor" stroke-miterlimit="10" />
              <path
                d="M3.0473 16.7443C3.77683 15.4805 4.8262 14.431 6.08994 13.7013C7.35368 12.9716 8.78724 12.5874 10.2465 12.5874C11.7058 12.5874 13.1394 12.9716 14.4031 13.7013C15.6668 14.431 16.7162 15.4805 17.4457 16.7443"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="text-sm text-center py-2">Войдите в личный кабинет, чтобы сохранять товары в избранное.</p>
            <div class="flex flex-col text-sm items-center gap-y-2">
              <el-link type="primary">
                <nuxt-link :to="{ name: 'auth-login' }" replace>
                  Войти
                </nuxt-link>
              </el-link>
              <div class="flex flex-col items-center gap-y-0.5">
                <span>Нет личного кабинета?</span>
                <el-link type="primary">
                  <nuxt-link :to="{ name: 'auth-register' }" replace>
                    Зарегистрировать
                  </nuxt-link>
                </el-link>
              </div>
            </div>
          </div>
        </div>
        <ul>
          <li>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ElLink from '~/node_modules/element-ui/lib/link'
import ElEmpty from '~/node_modules/element-ui/lib/empty'
import ElImage from '~/node_modules/element-ui/lib/image'
export default {
  components: {
    ElLink, ElImage, ElEmpty
  },
  computed: {
    ...mapGetters({
      basket: 'basket/getProducts'
    })
  },
  methods: {
    ...mapActions({
      removeProduct: 'basket/deleteProduct'
    })
  },
  mounted() {
    this.$store.dispatch('basket/getAllProducts')
  },
}
</script>

<style>
</style>
