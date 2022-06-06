<template>
  <div class="
      min-h-screen
      h-full
      bg-[#EEF6FF]
      flex flex-row
      justify-center
      items-center
    ">
    <el-form @submit.prevent="submitForm" ref="loginForm" :rules="rules" :model="form"
      class="p-5 shadow-md rounded-md border bg-white">
      <h2 class="py-4 text-center font-inter">Добро пожаловать</h2>
      <el-form-item prop="email">
        <el-input v-model="form.email" type="email" prefix-icon="el-icon-user" placeholder="example@domain.ru">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" prefix-icon="el-icon-key" placeholder="Пароль"></el-input>
      </el-form-item>
      <div class="pt-2">
        <el-button type="primary" @click="submitForm">Войти</el-button>
      </div>

    </el-form>
    <!-- <div class="p-6 bg-white rounded-lg drop-shadow-lg border border-gray-300">
      <div class="flex justify-center items-center pb-3 pt-4">
        <LogoShort />
      </div>
      <form @submit.prevent="login" class="px-3.5 py-4 flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          v-model="form.email"
          id="email"
          placeholder="Электронная почта"
          required
          class="
            p-2
            focus:outline-none
            focus:border-opacity-0
            focus:ring-2
            focus:ring-accent
            border border-gray-300
            rounded-lg
            bg-gray-100
            shadow
            w-full
          "
        />
        <input
          type="password"
          name="password"
          v-model="form.password"
          id="password"
          placeholder="Пароль"
          required
          class="
            p-2
            focus:outline-none
            focus:border-opacity-0
            focus:ring-2
            focus:ring-accent
            border border-gray-300
            rounded-lg
            bg-gray-100
            shadow
            w-full
          "
        />
        <NuxtButton> Войти </NuxtButton>
      </form>
    </div> -->
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
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$auth
        .loginWith('laravelSanctum', { data: this.form })
        .then((response) => {
          this.$router.push('/admin')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
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
