<template>
  <div class="order" v-if="this.$store.getters.info.role === 'admin'">
    <h1 class="title">{{ order.name }}</h1>
    <p class="book_author">Автор: {{ order.author }}</p>
    <p class="book_library">Библиотека: {{ order.library }}</p>
    <p class="book_price">Цена: {{ order.price }}$</p>
    <button @click="orderBook">Одобрить</button>
  </div>
  <h1 class="warningUser" v-else>Вам не доступен данный контент</h1>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "order",
  data() {
    return {
      order: {},
      book: {},
      user: {},
    };
  },
  methods: {
    orderBook() {
      /*firebase.firestore().collection("order").add({
        book: this.book.id,
        addDate: "",
        dropDate: "",
        user: this.$store.getters.info.id,
      });
      firebase.firestore().collection("books").doc(this.book.id).update({
        availability: false,
      });
      alert("Книга заказана"); */
    },
  },
  created() {
    //проблема с тем что 1-ый запрос из firebase не успевает
    //подгрузиться как начинает запускаться 2-ой (отложено)
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
      .collection("books")
      .doc(this.order.book)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.book.id = doc.id;
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
