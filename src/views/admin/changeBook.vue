<template>
  <div class="changeBook" v-if="this.$store.getters.info.role === 'admin'">
    <h1 class="title">ИЗМЕНИТЬ КНИГУ</h1>
    <form name="changeBook" onsubmit="return false;">
      <div class="container_Book">
        <input
          class="input_book"
          name="name"
          placeholder="название"
          v-model="book.name"
        />
        <input
          class="input_book"
          name="author"
          placeholder="автор"
          v-model="book.author"
        />
        <input
          class="input_book"
          name="library"
          placeholder="библиотека"
          v-model="book.library"
        />
        <input
          class="input_book"
          name="price"
          placeholder="стоимость"
          v-model="book.price"
        />
        <input
          class="input_book"
          name="qty"
          placeholder="кол-во"
          v-model="book.qty"
          type="number"
        />
        <div class="container_availabilityCheckbox">
          <input
            id="availability_checkbox"
            type="checkbox"
            v-model="book.availability"
          />
          <label for="availability_checkbox">Наличие</label>
        </div>
        <button @click="changeBook">изменить книгу</button>
      </div>
    </form>
  </div>
  <h1 class="warningUser" v-else>Вам не доступен данный контент</h1>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "changeBook",
  data() {
    return {
      book: {
        name: "",
        author: '',
        availability: true,
        library: "",
        price: "",
        qty: 0,
      },
    };
  },
  methods: {
    changeBook() {
      console.log(123);
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
