<template>
  <div
    class="catalog-item"
    v-if="
      book_data.availability == true || this.$store.getters.info.role == 'admin'
    "
  >
    <div class="container_catalogItem">
      {{ book_data.name }}
      <div>
        <button
          v-if="this.$store.getters.info.role == 'admin'"
          @click="deleteBook"
        >
          удалить
        </button>
        <button @click="bookClick">открыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "catalog-item",
  props: {
    book_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    bookClick() {
      this.$emit("bookClick", this.book_data.id);
    },
    deleteBook() {
      this.$emit("deleteBook", this.book_data.id);
    },
  },
};
</script>
