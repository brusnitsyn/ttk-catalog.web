<template>
  <div class="flex">
    <el-menu
      default-active="2"
      class="el-menu-vertical min-h-full shrink"
      :collapse="openMenu"
    >
      <el-menu-item @click="changeMenu" index="0">
        <i class="el-icon-menu"></i>
        <span>Скрыть меню</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-home"></i>
        <span>Главная</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>Товары</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <Nuxt class="w-full" />
    </el-container>
    <ProductPropertiesDialog v-if="showPropertiesDialog" />
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
            showPropertiesDialog: "products/getShowPropertiesDialog",
        }),
    },
}
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 300px;
}
</style>
