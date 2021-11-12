<template>
  <form @submit.prevent="submitHandler">
    <div class="container_windowDone">
      <h1 class="title">РЕГИСТРАЦИЯ</h1>
      <label for="registration_email">email</label>
      <input
        class="login_input"
        id="registration_email"
        type="text"
        v-model.trim="reg_email"
      />
      <label for="registration_password">Пароль</label>
      <input
        class="login_input"
        id="registration_password"
        type="password"
        v-model.trim="reg_password"
      />
      <label for="registration_fio">ФИО</label>
      <input
        class="login_input"
        id="registration_fio"
        type="text"
        v-model.trim="reg_fio"
      />
      <label for="registration_phone">Номер телефона</label>
      <input
        class="login_input"
        id="registration_phone"
        type="text"
        v-model.trim="reg_phone"
      />
      <button type="submit">зарегистрироваться</button>
      <router-link to="/login">войти</router-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      reg_email: "",
      reg_password: "",
      reg_phone: "",
      reg_fio: '',
    };
  },
  methods: {
    async submitHandler() {
      const formData = {
        email: this.reg_email,
        password: this.reg_password,
        phone: this.reg_phone,
        fio: this.reg_fio,
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
