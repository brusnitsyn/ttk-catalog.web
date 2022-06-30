<template>
  <div class="flex relative">
    <aside>
      <el-menu :router="true" default-active="1" class="el-menu-vertical h-full" :collapse="openMenu">
        <el-menu-item @click="changeMenu">
          <i :class="openMenu ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
          <span>Скрыть меню</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span>Главная</span>
          </template>
          <el-menu-item index="1-1" :route="{ name: 'admin-dashboard' }">
            <i class="el-icon-house"></i>
            <span>Дашбоард</span>
          </el-menu-item>
          <el-menu-item index="1-2" :route="{ name: 'admin-banners' }">
            <i class="el-icon-picture-outline"></i>
            <span>Баннеры</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="2" :route="{ name: 'admin-products' }">
          <i class="el-icon-menu"></i>
          <span>Товары</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>Пользователи</span>
          </template>
          <el-menu-item index="3-1" :route="{ name: 'admin-users' }">
            <i class="el-icon-menu"></i>
            <span>Все пользователи</span>
          </el-menu-item>
          <el-menu-item index="3-2" :route="{ name: 'admin-users-create' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить пользователя</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>

    <Nuxt class="w-full" />
    <!-- <ProductPropertiesDialog v-if="showPropertiesDialog" /> -->
  </div>
</template>

<script>
const ElMenu = () => import('~/node_modules/element-ui/lib/menu')
const ElMenuItem = () => import('~/node_modules/element-ui/lib/menu-item')
const ElSubmenu = () => import('~/node_modules/element-ui/lib/submenu')
const ElContainer = () => import('~/node_modules/element-ui/lib/container')
import { mapGetters } from 'vuex'
export default {
  layout: "admin",
  middleware: "auth",
  components: {
    ElMenu, ElMenuItem, ElSubmenu, ElContainer
  },
  data() {
    return {
      openMenu: true
    }
  },
  methods: {
    changeMenu() {
      this.openMenu = !this.openMenu
    }
  },
  computed: {
    ...mapGetters({
      // showProductCreateForm: 'products/getShowCreateDialog',
      // showPropertiesDialog: "products/getShowPropertiesDialog",
    }),
  },
}
</script>

<style>
.el-menu {
  position: absolute;
}

.el-menu.el-menu--inline {
  position: relative;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 300px;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
}
</style>
