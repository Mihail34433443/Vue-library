<template>
  <div class="Home">
    <Search />
    <button @click="test">оповещение</button>
    <catalog />
  </div>
</template>

<script>
import catalog from "../components/catalog";
import Search from "../components/search-bar";

export default {
  name: "Home",
  components: {
    catalog,
    Search,
  },
  methods: {
    test() {
      this.$store.dispatch("addMessage", {
        text: "текст",
        state: false,
        title: "заглавие",
      });
    },
  },
};
</script>
