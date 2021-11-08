<template>
  <div class="book">
    <h1 class="title">{{ book.name }}</h1>
    <p class="book_author">Автор: {{ book.author }}</p>
    <p class="book_library">Библиотека: {{ book.library }}</p>
    <p class="book_price">Цена: {{ book.price }}$</p>
    <button @click="orderBook">Заказать</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "book",
  data() {
    return {
      book: {
        id: "",
        name: "",
        author: "",
        library: "",
        price: "",
        availability: "",
      },
    };
  },
  methods: {
    orderBook() {
      firebase.firestore().collection("order").add({
        book: this.book.id,
        addDate: "",
        dropDate: "",
        user: this.$store.getters.info.id,
      });
      firebase.firestore().collection("books").doc(this.book.id).update({
        availability: false,
      });
      alert("Книга заказана");
    },
  },
  created() {
    firebase
      .firestore()
      .collection("books")
      .doc(this.$route.query.book)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.book.id = doc.id;
          this.book.name = doc.data().name;
          this.book.author = doc.data().author;
          this.book.library = doc.data().library;
          this.book.price = doc.data().price;
          this.book.availability = doc.data().availability;
        } else {
          console.log("такой книги нет");
        }
      });
  },
};
</script>
