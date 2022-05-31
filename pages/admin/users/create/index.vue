<template>
  <el-container direction="vertical" class="pt-6 px-4">
    <el-page-header @back="$router.go(-1)" class="text-2xl font-semibold" title="Назад"
      content="Добавить пользователя" />
    <el-form ref="createForm" :model="form" :rules="rules" class="pt-6 max-w-md">
      <el-form-item label="Имя" prop="name">
        <el-input type="name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="Электронная почта" prop="email">
        <el-input type="email" v-model="form.email" />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item class="pt-3">
        <el-button type="primary" @click="submitForm('createForm')">Добавить</el-button>
        <el-button @click="resetForm('createForm')">Сбросить</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: 'Заполните поле', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Заполните поле', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Заполните поле', trigger: 'blur' },
          { min: 6, message: 'Минимальная длина пароля 6 символов', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/admin/register', this.form)
            .then((response) => {
              this.$message({
                type: 'success',
                message: `Пользователь "${response.data.name}" был добавлен`
              });
            })
            .catch((error) => {
              this.$message({
                type: 'error',
                message: `${error}`
              });
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
</style>
