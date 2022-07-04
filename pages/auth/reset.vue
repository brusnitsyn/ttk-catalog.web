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
      <h2 class="py-4 text-center font-inter text-lg">Восстановление доступа</h2>
      <el-form :model="form" action=" " status-icon>
        <el-form-item label="Введите адрес электронной почты" required>
          <el-input prefix-icon="el-icon-message" v-model="form.email" placeholder="example@domain.ru" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @keyup.native.enter="submitForm" @click="submitForm">Восстановить</el-button>
    </div>
  </div>
</template>

<script>
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
      },
      rules: {
        email: [
          { required: true, message: 'Введите адрес электронной почты', trigger: 'blur' }
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
