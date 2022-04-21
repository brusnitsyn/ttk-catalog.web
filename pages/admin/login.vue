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
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('laravelSanctum', {data: this.form})
      .then(response => {
        this.$router.push('/admin')
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
