<template>
  <div class="
      min-h-screen
      h-full
      bg-[#EEF6FF]
      flex flex-row
      justify-center
      items-center
    ">
    <el-form method="post" action="" @submit.native.prevent="submitForm" native-type="submit" ref="loginForm"
      :rules="rules" :model="form" class="p-5 shadow-lg rounded-[4px] border bg-white max-w-sm w-full">
      <h2 class="py-4 text-center font-inter">Вход в личный кабинет</h2>
      <el-form-item prop="email">
        <el-input v-model="form.email" type="email" prefix-icon="el-icon-user" placeholder="example@domain.ru">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" prefix-icon="el-icon-key" placeholder="Пароль"></el-input>
      </el-form-item>
      <div class="pt-2">
        <el-button type="primary" @click="submitForm" :loading="loading">Войти</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  auth: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Введите адрес электронной почты', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 6, message: 'Минимальная длина пароля составляет 6 символов', trigger: 'blur' }
        ],
      },
      loading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$auth
          .loginWith('laravelSanctum', { data: this.form })
          .then((response) => {
            this.$router.push('/admin')
          })
          .catch((error) => {
            this.$notify({
              title: 'Ошибка авторизации',
              message: error.response.data.message,
              type: 'error'
            });
          })
      } catch (error) {
        this.$notify({
          title: 'Ошибка сервера',
          message: error.message,
          type: 'error'
        });
      }
      this.loading = false
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.onSubmit()
        } else {
          return false;
        }
      });
    },
  },
}
</script>

<style>
</style>
