<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <el-container direction="vertical">
    <el-table ref="multipleTable" :data="users" class="w-full" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="ФИО" min-width="200" />
      <el-table-column property="email" label="E-Mail" min-width="200" />
      <el-table-column label="Действия" min-width="200">
        <template slot-scope="scope">
          <el-button type="text">Редактировать</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-2">
      <el-pagination v-if="pagination.lastPage > 1" :page-size.sync="pagination.perPage" background
        :page-count="pagination.perPage" @current-change="paginationCurrentChange" layout="pager"
        :total="pagination.total">
      </el-pagination>
    </div>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';

import ElContainer from '@/node_modules/element-ui/lib/container'
import ElTable from '@/node_modules/element-ui/lib/table'
import ElTableColumn from '@/node_modules/element-ui/lib/table-column'
import ElButton from '@/node_modules/element-ui/lib/button'
import ElPagination from '@/node_modules/element-ui/lib/pagination'

export default {
  components: {
    ElContainer, ElTable, ElTableColumn, ElButton, ElPagination
  },
  computed: {
    ...mapGetters({
      users: 'api/users/get/getUsers',
      pagination: 'api/users/get/getPagination'
    })
  },
  head: {
    title: 'Пользователи'
  },
  async fetch() {
    await this.$store.dispatch('api/users/get/fetchAllUsers')
  },
  fetchOnServer: false,
  mounted() {
    if (!this.users.length)
      this.$store.dispatch('api/users/get/fetchAllUsers')
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('Это действие удалит пользователя без возможности восстановления. Продолжить?', 'Внимание', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('api/users/post/deleteUser', row.id)
        //this.tableData.splice(index, 1);
        this.$message({
          type: 'success',
          message: `Пользователь "${row.name}" был удален`
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        });
      });
    }
  }
}
</script>

<style>
</style>
