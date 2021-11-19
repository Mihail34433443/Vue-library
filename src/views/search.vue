<template>
  <div class="search">
    <h1 class="title">РЕЗУЛЬТАТЫ</h1>
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
import catalogItem from "../components/catalog-item.vue";
import { deleteBook, searchBooks } from "../services/bookService";

export default {
  name: "search",
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
      this.$router.push({ name: "book", query: { book: id } });
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
  created() {
    searchBooks(this)
  },
};
</script>
