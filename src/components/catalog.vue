<template>
  <div class="catalog">
    <h1 class="title">ВСЕ КНИГИ</h1>
    <catalogItem
      v-for="book in books"
      :key="book.id"
      v-bind:book_data="book"
      @bookClick="bookClick"
      @deleteBook="deleteBook"
    />
  </div>
</template>

<script>
import catalogItem from "./catalog-item";
import { getCatalog, deleteBook } from "../services/bookService.js";

export default {
  name: "catalog",
  components: {
    catalogItem,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    bookClick(id) {
      if (this.$store.getters.info.role != "admin") {
        this.$router.push({ name: "book", query: { book: id } });
      } else {
        this.$router.push({ name: "changeBook", query: { book: id } });
      }
    },
    deleteBook(id) {
      deleteBook(id);
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].id == id) {
          this.books.splice(i, 1);
          break;
        }
      }
    },
  },
  mounted() {
    this.books = getCatalog();
  },
};
</script>
