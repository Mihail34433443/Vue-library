<template>
  <form @submit.prevent="submitHandler">
    <div class="container_windowDone">
      <h1 class="title">ВХОД</h1>
      <label for="email">Имя</label>
      <input
        class="login_input"
        id="email"
        type="text"
        v-model.trim="email"
      />
      <label for="pass">Пароль</label>
      <input
        class="login_input"
        id="password"
        type="password"
        v-model.trim="password"
      />
      <button type="submit">войти</button>
      <router-link to="/registration">зарегистрироваться</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
