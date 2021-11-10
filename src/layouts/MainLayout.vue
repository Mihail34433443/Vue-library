<template>
  <div>
    <Header />
    
    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";

import firebase from 'firebase/compat/app'

export default {
  name: "main-layout",
  //получение инфы о пользователе
  async mounted() {
    const currentUser = await firebase.auth().currentUser
    if (!Object.keys(this.$store.getters.info).length && currentUser != null) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Header,
    Footer,
  },
};
</script>