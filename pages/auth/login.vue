<template>
  <div class="
      min-h-screen
      h-full
      bg-[#EEF6FF]
      flex flex-row
      justify-center
      items-center
    ">
    <div class="p-5 shadow-lg rounded-[4px] border bg-white max-w-sm w-full">
      <el-form method="post" action="" @submit.native.prevent="submitForm" native-type="submit" ref="loginForm"
        :rules="rules" :model="form" class="">
        <h2 class="py-4 text-center font-inter text-lg">Вход в личный кабинет</h2>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" prefix-icon="el-icon-user" placeholder="example@domain.ru">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-key" placeholder="Пароль"></el-input>
        </el-form-item>
        <div class="pt-2 flex flex-row justify-end items-center gap-x-4">
          <el-button type="primary" @click="submitForm" :loading="loading" class="w-[120px]">Войти</el-button>
        </div>
      </el-form>
      <el-divider></el-divider>
      <div class="flex flex-row justify-between px-2">
        <nuxt-link to="/">
          <el-link icon="el-icon-back">
            На главную
          </el-link>
        </nuxt-link>
        <nuxt-link :to="{ name: 'auth-reset' }" replace>
          <el-link icon="el-icon-key">
            Забыли пароль?
          </el-link>
        </nuxt-link>
      </div>
      <el-divider></el-divider>
      <div class="flex flex-col justify-center items-center gap-y-4">
        <span>Войти с помощью</span>
        <div class="flex flex-row justify-center">
          <el-button round plain size="small">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.8553 10.3614C20.8386 10.2674 20.7562 10.2 20.6607 10.2H12.2C12.0895 10.2 12 10.2895 12 10.4V13.6C12 13.7105 12.0895 13.8 12.2 13.8H17.0864C16.3443 15.8956 14.3503 17.4 12 17.4C9.01785 17.4 6.6 14.9822 6.6 12C6.6 9.01785 9.01785 6.6 12 6.6C13.3087 6.6 14.5052 7.0694 15.4394 7.84461C15.5209 7.91225 15.6409 7.90905 15.7158 7.83415L17.9816 5.56839C18.0617 5.48833 18.0595 5.35768 17.975 5.28238C16.3853 3.8667 14.2961 3 12 3C7.02975 3 3 7.02975 3 12C3 16.9703 7.02975 21 12 21C16.9703 21 21 16.9703 21 12C21 11.453 20.949 10.8872 20.8553 10.3614Z"
                fill="currentColor" />
            </svg>
          </el-button>
          <el-button round plain size="small">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.5035 18.381H19.222C18.3588 18.381 18.0992 17.682 16.5511 16.1339C15.2 14.8313 14.6292 14.6686 14.2868 14.6686C13.8145 14.6686 13.6847 14.7984 13.6847 15.4505V17.5021C13.6847 18.0573 13.5049 18.3825 12.0553 18.3825C10.6485 18.288 9.28422 17.8606 8.07493 17.1355C6.86564 16.4104 5.84592 15.4084 5.09975 14.212C3.32828 12.0071 2.0957 9.41934 1.5 6.65442C1.5 6.31196 1.62979 6.00234 2.28187 6.00234H4.56182C5.14822 6.00234 5.35933 6.26349 5.5892 6.86553C6.69633 10.1244 8.58534 12.9579 9.35158 12.9579C9.64556 12.9579 9.77379 12.8281 9.77379 12.0947V8.7389C9.67684 7.20799 8.86369 7.0782 8.86369 6.52463C8.87413 6.37862 8.94104 6.24243 9.05022 6.14492C9.1594 6.04742 9.30227 5.99628 9.44853 6.00234H13.0326C13.5221 6.00234 13.6847 6.24629 13.6847 6.83269V11.3613C13.6847 11.8508 13.8958 12.0134 14.0428 12.0134C14.3368 12.0134 14.5635 11.8508 15.1015 11.3128C16.2569 9.90381 17.2009 8.33401 17.9037 6.65286C17.9756 6.45092 18.1115 6.27804 18.2908 6.16058C18.4701 6.04313 18.6829 5.98755 18.8967 6.00234H21.1782C21.8616 6.00234 22.007 6.3448 21.8616 6.83269C21.032 8.6911 20.0055 10.4552 18.7997 12.0947C18.5542 12.47 18.4557 12.6655 18.7997 13.1049C19.0265 13.4473 19.8256 14.1151 20.3635 14.7499C21.1452 15.5297 21.7944 16.4319 22.2853 17.4208C22.4808 18.0557 22.154 18.381 21.5035 18.381Z"
                fill="currentColor" />
            </svg>
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import('~/assets/css/element-index.scss')

const ElButton = () => import('~/node_modules/element-ui/lib/button')
const ElLink = () => import('~/node_modules/element-ui/lib/link')
const ElForm = () => import('~/node_modules/element-ui/lib/form')
const ElInput = () => import('~/node_modules/element-ui/lib/input')
const ElFormItem = () => import('~/node_modules/element-ui/lib/form-item')
const ElDivider = () => import('~/node_modules/element-ui/lib/divider')
export default {
  layout: 'admin',
  auth: 'guest',
  components: {
    ElButton, ElForm, ElFormItem, ElInput, ElLink, ElDivider
  },
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
