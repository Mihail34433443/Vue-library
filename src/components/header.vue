<template>
  <header>
    <ul class="container_headerLink">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
      >
        <a class="header_link">{{ link.title }}</a>
      </router-link>
    </ul>
    <div class="login_bar">
      <div
        v-if="this.$store.getters.info.role == 'user'"
        class="container_logout"
      >
        <router-link :to="'/profile'" tag="button">Профиль</router-link>
        <button @click="logout">Выйти</button>
      </div>
      <div v-else class="container_logout">
        <button @click="login">Войти</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Главная", url: "/", exact: true },
      { title: "Заказы (админ)", url: "/orders", user: "admin" },
      { title: "Добавить книгу (админ)", url: "/addBook", user: "admin" },
    ],
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
    },
    async login() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
};
</script>