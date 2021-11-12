<template>
  <div class="book">
    <h1 class="title">{{ book.name }}</h1>
    <p class="book_author">Автор: {{ book.author }}</p>
    <p class="book_library">Библиотека: {{ book.library }}</p>
    <p class="book_price">Цена: {{ book.price }}$</p>
    <p class="book_qty">Кол-во {{ book.qty }}</p>
    <input type="number" v-model="qty" />
    <button @click="addLocalStorage">в желаемое</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "book",
  data() {
    return {
      book: {
        name: "",
      },
      qty: 1,
    };
  },
  methods: {
    /*orderBook() {
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
    },*/
    addLocalStorage() {
      var desired = localStorage.getItem("desired");
      if (desired == null) {
        var desired = {
          arrayDesired: [
            {
              id: this.$route.query.book,
              qty: this.qty,
            },
          ],
        };
      } else {
        desired = JSON.parse(desired);
        if (this.checkDesired(desired.arrayDesired, this.book.id)) {
          this.book.qty = this.book.qty - this.qty;
          if (this.book.qty >= 0) {
            desired.arrayDesired.push({
              id: this.book.id,
              qty: this.qty,
            });
          }
          else {}
        } else {}
      }

      localStorage.setItem("desired", JSON.stringify(desired));
      var info = localStorage.getItem("desired");
      info = JSON.parse(info);
    },
    checkDesired(array, id) {
      let reply = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] == id) {
          reply = true;
          break;
        }
      }
      return reply;
    },
  },
  mounted() {
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
          this.book.qty = doc.data().qty;
        } else {
          console.log("такой книги нет");
        }
      });
  },
};
</script>
