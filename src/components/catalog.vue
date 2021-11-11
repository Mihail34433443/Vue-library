<template>
  <div class="catalog">
    <h1 class="title">ВСЕ КНИГИ</h1>
    <catalogItem
      v-for="book in books"
      :key="book.id"
      v-bind:book_data="book"
      @bookClick="bookClick"
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
      this.$router.push({ name: "book", query: { book: id } });
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
          });
        });
      });
  },
};
</script>
