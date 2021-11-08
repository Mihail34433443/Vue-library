<template>
  <div class="order">
    <h1 class="title">{{ order.name }}</h1>
    <p class="book_author">Автор: {{ order.author }}</p>
    <p class="book_library">Библиотека: {{ order.library }}</p>
    <p class="book_price">Цена: {{ order.price }}$</p>
    <button @click="orderBook">Заказать</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "order",
  data() {
    return {
      order: {
        id: "",
        name: "",
        author: "",
        library: "",
        price: "",
        availability: "",
      },
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
      .collection("order")
      .doc(this.$route.query.order)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.order.id = doc.id;
          this.order.addDate = doc.data().addDate;
          this.order.book = doc.data().book;
          this.order.dropDate = doc.data().dropDate;
          this.order.user = doc.data().user;
        } else {
          console.log("такой книги нет");
        }
      });
      firebase
      .firestore()
      .collection("book")
      .doc(this.order.book)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.order.id = doc.id;
          this.order.addDate = doc.data().addDate;
          this.order.book = doc.data().book;
          this.order.dropDate = doc.data().dropDate;
          this.order.user = doc.data().user;
        } else {
          console.log("такой книги нет");
        }
      });
  },
};
</script>
