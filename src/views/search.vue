<template>
  <div class="search">
    <h1 class="title">РЕЗУЛЬТАТЫ</h1>
    <catalogItem
      v-for="book in books[0]"
      :key="book.id"
      v-bind:book_data="book"
      @bookClick="bookClick"
    />
  </div>
</template>

<script>
import { db } from "../main";
import catalogItem from "../components/catalog-item.vue";

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
  },
  created() {
    var data = [];

    db.collection("books")
      .where("name", "==", this.$route.query.search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            price: doc.data().price,
            library: doc.data().library,
          });
        });
      })

    db.collection("books")
      .where("author", "==", this.$route.query.search)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              name: doc.data().name,
              author: doc.data().author,
              price: doc.data().price,
              library: doc.data().library,
            });
          });
      })
    this.books.push(data);
    console.log(data)
  },
};
</script>
