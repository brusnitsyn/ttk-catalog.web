<template>
  <el-container direction="vertical">
    <el-row type="flex" align="middle" justify="center" :span="24"
      class="w-full max-h-[280px] md:max-h-[320px] bg-orange-300 h-full">
      <el-col :span="18" class="">
        <span class="font-inter text-2xl">С возвращением, <b>{{ $auth.user.name }}</b></span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :span="24" class="w-full mt-2" :gutter="48">
      <el-col class="grid" :span="6">
        <el-button class="w-full h-[80px]" icon="el-icon-circle-plus-outline">
          <span class="font-inter">
            Добавить товар
          </span>
        </el-button>
        <el-button class="w-full h-[80px]" icon="el-icon-circle-plus-outline">
          <span class="font-inter">
            Добавить товар
          </span>
        </el-button>

      </el-col>
      <el-col :span="6">
        <div>2</div>
      </el-col>
      <el-col :span="6">
        <div>3</div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
const ElContainer = () => import('~/node_modules/element-ui/lib/container')
const ElRow = () => import('~/node_modules/element-ui/lib/row')
const ElCol = () => import('~/node_modules/element-ui/lib/col')
const ElButton = () => import('~/node_modules/element-ui/lib/button')
export default {
  components: {
    ElContainer, ElRow, ElCol, ElButton
  }
}
</script>

<style>
</style>
