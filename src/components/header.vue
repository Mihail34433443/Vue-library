<template>
  <header>
    <ul class="container_headerLink">
      <li>
        <router-link class="header_link" :to="'/'">Главная</router-link>
      </li>
      <li v-if="this.$store.getters.info.role == 'admin'">
        <router-link class="header_link" :to="'/orders'"
          >Заказы</router-link
        >
      </li>
      <li v-if="this.$store.getters.info.role == 'admin'">
        <router-link class="header_link" :to="'/addBook'"
          >Добавить книгу</router-link
        >
      </li>
    </ul>
    <div class="login_bar">
      <div
        v-if="this.$store.getters.info.role != undefined"
        class="container_logout"
      >
        <router-link :to="'/profile'"><button>Профиль</button></router-link>
        <button @click="logout">Выйти</button>
      </div>
      <div
        v-if="this.$store.getters.info.role == undefined"
        class="container_logout"
      >
        <button @click="login">Войти</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
    },
    async login() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>