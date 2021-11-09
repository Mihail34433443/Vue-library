<template>
  <div class="Home">
    <Search />
    <catalog />
  </div>
</template>

<script>
import catalog from "../components/catalog";
import Search from "@/components/search-bar";

export default {
  name: "Home",
  components: {
    catalog,
    Search
  },
};
</script>
