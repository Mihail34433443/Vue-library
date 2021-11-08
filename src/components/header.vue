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
        <a class="header_link">{{link.title}}</a>
      </router-link>
    </ul>
    <div class="login_bar">
      <div class="container_logout">
        <router-link :to="'/profile'" tag="button">Профиль</router-link>
        <button @click="logout">Выйти</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    links: [
      {title: 'Главная', url: '/', exact: true},
      {title: 'Заказы', url: '/orders'},
      {title: 'Добавить книгу', url: '/addBook'}
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
}
</script>