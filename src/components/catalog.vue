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
import { db } from "../main";
import catalogItem from "./catalog-item";

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
      }
      else {
        this.$router.push({ name: "changeBook", query: { book: id } });
      }
    },
    deleteBook(id) {
      db.collection("books")
        .doc(id)
        .delete()
        .then(() => {
          console.log("книга удалена");
        });
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].id == id) {
          this.books.splice(i, 1);
          break;
        }
      }
    },
  },
  created() {
    db.collection("books")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.books.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            price: doc.data().price,
            library: doc.data().library,
            availability: doc.data().availability,
            qty: doc.data().qty,
          });
        });
      });
  },
};
</script>
