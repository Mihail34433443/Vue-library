<template>
  <div>
    <Header />
    <Search />
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
import Search from "@/components/search-bar";

export default {
  name: "main-layout",
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Header,
    Footer,
    Search,
  },
};
</script>