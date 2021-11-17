<template>
  <div class="changeBook" v-if="this.$store.getters.info.role === 'admin'">
    <h1 class="title">ИЗМЕНИТЬ КНИГУ</h1>
    <div class="container_Book">
      <input class="input_book" placeholder="название" v-model="book.name" />
      <input class="input_book" placeholder="автор" v-model="book.author" />
      <select class="input_book" v-model="book.library">
        <option v-for="item in library" :selected="book.library == item" v-bind:value="item.name" :key="item.id">
          {{ item.name }}
        </option>
      </select>
      <input class="input_book" placeholder="стоимость" v-model="book.price" />
      <input
        class="input_book"
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
        id: "",
        name: "",
        author: "",
        availability: true,
        library: "",
        price: "",
        qty: 0,
      },
      library: [],
    };
  },
  methods: {
    changeBook() {
      firebase.firestore().collection("books").doc(this.book.id).set({
        name: this.book.name,
        author: this.book.author,
        availability: this.book.availability,
        library: this.book.library,
        price: this.book.price,
        qty: Number(this.book.qty),
      });
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
    firebase
      .firestore()
      .collection("library")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.library.push({
            id: doc.id,
            active_time: doc.data().active_time,
            address: doc.data().address,
            name: doc.data().name,
          });
        });
      });
  },
};
</script>
