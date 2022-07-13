<template>
  <div class="flex flex-row">
    <el-drawer v-if="isMobile" direction="ltr" :visible.sync="mobileMenuOpen" size="100%">
      <el-menu :router="true" default-active="0-1" class="w-full ">
        <el-submenu index="0">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span>Главная</span>
          </template>
          <el-menu-item index="0-1" :route="{ name: 'admin-dashboard' }">
            <i class="el-icon-house"></i>
            <span>Дашбоард</span>
          </el-menu-item>
          <el-menu-item index="0-2" :route="{ name: 'admin-banners' }">
            <i class="el-icon-picture-outline"></i>
            <span>Баннеры</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="1" :route="{ name: 'admin-products' }">
          <i class="el-icon-menu"></i>
          <span>Товары</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>Пользователи</span>
          </template>
          <el-menu-item index="2-1" :route="{ name: 'admin-users' }">
            <i class="el-icon-menu"></i>
            <span>Все пользователи</span>
          </el-menu-item>
          <el-menu-item index="2-2" :route="{ name: 'admin-users-create' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить пользователя</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-drawer>
    <el-menu v-else :router="true" default-active="0-1" class="min-w-[260px]">
      <el-submenu index="0">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span>Главная</span>
        </template>
        <el-menu-item index="0-1" :route="{ name: 'admin-dashboard' }">
          <i class="el-icon-house"></i>
          <span>Дашбоард</span>
        </el-menu-item>
        <el-menu-item index="0-2" :route="{ name: 'admin-banners' }">
          <i class="el-icon-picture-outline"></i>
          <span>Баннеры</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="1" :route="{ name: 'admin-products' }">
        <i class="el-icon-menu"></i>
        <span>Товары</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>Пользователи</span>
        </template>
        <el-menu-item index="2-1" :route="{ name: 'admin-users' }">
          <i class="el-icon-menu"></i>
          <span>Все пользователи</span>
        </el-menu-item>
        <el-menu-item index="2-2" :route="{ name: 'admin-users-create' }">
          <i class="el-icon-circle-plus-outline"></i>
          <span>Добавить пользователя</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center h-16 px-4 lg:pl-11 lg:pr-4 border-b">
        <div class="flex gap-x-4 items-center">
          <el-button v-if="isMobile" plain @click="mobileMenuOpen = !mobileMenuOpen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z" fill="currentColor"></path>
            </svg>
          </el-button>
          <el-page-header @back="$router.go(-1)" class="text-sm lg:text-base font-semibold" title="Назад" :content="pageTitle" />
        </div>
      </div>
      <Nuxt class="w-full px-4 lg:max-w-7xl lg:mx-auto mt-4 lg:mt-6" />
    </div>

  </div>
</template>

<script>
const ElMenu = () => import('~/node_modules/element-ui/lib/menu')
const ElMenuItem = () => import('~/node_modules/element-ui/lib/menu-item')
const ElSubmenu = () => import('~/node_modules/element-ui/lib/submenu')
const ElContainer = () => import('~/node_modules/element-ui/lib/container')
const ElDrawer = () => import('~/node_modules/element-ui/lib/drawer')
const ElButton = () => import('~/node_modules/element-ui/lib/button')
import ElPageHeader from '@/node_modules/element-ui/lib/page-header'
import { mapGetters } from 'vuex'
export default {
  layout: "admin",
  middleware: "auth",
  components: {
    ElMenu, ElMenuItem, ElSubmenu, ElContainer, ElPageHeader, ElDrawer, ElButton
  },
  head() {
    let sefl = this
    if (process.browser) {
      this.title = document.title
    }
    return {
      changed({ title }) {
        sefl.pageTitle = title
      }
    }
  },
  data() {
    return {
      pageTitle: '',
      mobileMenuOpen: false
    }
  },
  watch: {
    $route(to, from) {
      this.mobileMenuOpen = false
    }
  },
  computed: {
    ...mapGetters({
      // showProductCreateForm: 'products/getShowCreateDialog',
      // showPropertiesDialog: "products/getShowPropertiesDialog",
    }),
    isMobile() {
      return this.$breakpoints.sSm
    },
  },
  mounted() {

  }
}
</script>

<style>
.el-page-header__content {
  font-size: initial;
}
/* .el-menu-vertical:not(.el-menu--collapse) {
  min-width: 260px;
} */
</style>
