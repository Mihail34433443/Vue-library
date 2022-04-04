<template>
  <div class="search-bar">
    <input v-model="message" class="search_input" id="searchValue" />
    <button @click="searchClick">найти</button>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    searchClick() {
      this.$router.push({ name: "search", query: { search: this.message } });
    },
  },
};
</script>
