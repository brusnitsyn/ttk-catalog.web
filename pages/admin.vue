<template>
  <div class="flex relative">
    <el-menu :router=true default-active="1" class="el-menu-vertical h-full" :collapse="openMenu">
      <el-menu-item @click="changeMenu">
        <i :class="(openMenu) ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        <span>Скрыть меню</span>
      </el-menu-item>
      <el-menu-item index="1" :route="{ name: 'admin-dashboard' }">
        <i class="el-icon-house"></i>
        <span>Главная</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>Товары</span>
        </template>
        <el-menu-item-group title="Товары">
          <el-menu-item index="2-1" :route="{ name: 'admin-products' }">
            <i class="el-icon-menu"></i>
            <span>Все товары</span>
          </el-menu-item>
          <el-menu-item index="2-2" :route="{ name: 'admin-products-create' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить товар</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Категории">
          <el-menu-item index="3-1" :route="{ name: 'admin-products' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить категорию</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Техника">
          <el-menu-item index="4-1" :route="{ name: 'admin-products' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить производителя</span>
          </el-menu-item>
          <el-menu-item index="4-2" :route="{ name: 'admin-products-create' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить тип техники</span>
          </el-menu-item>
          <el-menu-item index="4-3" :route="{ name: 'admin-products-create' }">
            <i class="el-icon-circle-plus-outline"></i>
            <span>Добавить технику</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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

    <el-container class="ml-[64px]">
      <Nuxt class="w-full" />
    </el-container>
    <!-- <ProductPropertiesDialog v-if="showPropertiesDialog" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "admin",
  middleware: "auth",
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
