<template>
  <Loading v-if="$fetchState.pending" />
  <el-container v-else direction="vertical" class="pt-6 px-4">
    <div class="
        flex
        items-center
        flex-row justify-between
      ">
      <el-page-header @back="$router.go(-1)" class="text-2xl font-semibold" title="Назад" content="Все пользователи" />
    </div>
    <el-table ref="multipleTable" :data="users" class="w-full pt-6" @selection-change="handleSelectionChange">
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
        :pager-count="pagination.perPage" @prev-click="paginationPrevClick" @next-click="paginationNextClick"
        @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
      </el-pagination>
    </div>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      users: 'api/users/get/getUsers',
      pagination: 'api/users/get/getPagination'
    })
  },
  async fetch() {
    await this.$store.dispatch('api/users/get/fetchAllUsers')
  },
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
