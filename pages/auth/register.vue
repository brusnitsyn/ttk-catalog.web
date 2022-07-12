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
        <h2 class="py-4 text-center font-inter text-lg">Регистрация личного кабинета</h2>
        <el-form-item prop="name">
          <el-input v-model="form.name" type="name" prefix-icon="el-icon-user" placeholder="ФИО">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" prefix-icon="el-icon-message" placeholder="example@domain.ru">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-key" placeholder="Пароль"></el-input>
        </el-form-item>
        <div class="pt-2 flex flex-row justify-between items-center gap-x-4">
          <nuxt-link to="/">
            <el-link icon="el-icon-back">
              На главную
            </el-link>
          </nuxt-link>
          <el-button type="primary" @click="submitForm" :loading="loading">Зарегистрироваться</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
import ElButton from '@/node_modules/element-ui/lib/button'
import ElLink from '@/node_modules/element-ui/lib/link'
import ElForm from '@/node_modules/element-ui/lib/form'
import ElInput from '@/node_modules/element-ui/lib/input'
import ElFormItem from '@/node_modules/element-ui/lib/form-item'
import ElDivider from '@/node_modules/element-ui/lib/divider'

export default {
  layout: 'admin',
  auth: 'guest',
  components: {
    ElButton, ElForm, ElFormItem, ElInput, ElLink, ElDivider
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: 'Введите ФИО', trigger: 'blur' }
        ],
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
            //this.$router.push('/admin')
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
