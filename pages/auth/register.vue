<template>
  <div
    class="
      min-h-screen
      h-full
      bg-[#EEF6FF]
      flex flex-row
      justify-center
      items-center
    "
  >
    <div class="p-6 bg-white rounded-lg drop-shadow-lg border border-gray-300">
      <div class="flex justify-center items-center pb-3 pt-4">
        <LogoShort />
      </div>
      <form
        @submit.prevent="register"
        class="px-3.5 py-4 flex flex-col space-y-4"
      >
        <input
          type="text"
          name="name"
          v-model="form.name"
          id="name"
          placeholder="Имя"
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
          type="email"
          name="email"
          v-model="form.email"
          id="email"
          placeholder="Адрес почты"
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
        <NuxtButton> Регистрация </NuxtButton>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  auth: 'guest',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async register() {
      await this.$axios
        .post('/api/admin/register', this.form)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      }).then((response) => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<style>
</style>
