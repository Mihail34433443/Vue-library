<template>
  <div class="addBook" v-if="this.$store.getters.info.role === 'admin'">
    <h1 class="title">ДОБАВИТЬ КНИГУ</h1>
    <div class="container_Book">
      <input class="input_book" placeholder="автор" v-model="newBook.author" />
      <input class="input_book" placeholder="название" v-model="newBook.name" />
      <input
        class="input_book"
        placeholder="стоимость"
        v-model="newBook.price"
      />
      <select class="input_book" v-model="newBook.library">
        <option v-for="item in library" v-bind:value="item.name" :key="item.id">
          {{ item.name }}
        </option>
      </select>
      <input
        class="input_book"
        placeholder="кол-во"
        v-model="newBook.qty"
        type="number"
      />
      <div class="container_availabilityCheckbox">
        <input
          id="availability_checkbox"
          type="checkbox"
          v-model="newBook.availability"
        />
        <label for="availability_checkbox">Наличие</label>
      </div>
      <button @click="addBook">добавить книгу</button>
    </div>
  </div>
  <h1 class="warningUser" v-else>Вам не доступен данный контент</h1>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "addBook",
  data() {
    return {
      newBook: {
        author: "",
        name: "",
        price: "",
        library: "",
        qty: '',
        availability: false,
      },
      library: [],
    };
  },
  methods: {
    addBook() {
      firebase.firestore().collection("books").add({
        author: this.newBook.author,
        name: this.newBook.name,
        price: this.newBook.price,
        library: this.newBook.library,
        qty: Number(this.newBook.qty),
        availability: this.newBook.availability,
      });
    },
  },
  created() {
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
