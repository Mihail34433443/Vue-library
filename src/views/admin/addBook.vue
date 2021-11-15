<template>
  <div class="addBook" v-if="this.$store.getters.info.role === 'admin'">
    <h1 class="title">ДОБАВИТЬ КНИГУ</h1>
    <form name="addBook" onsubmit="return false;">
      <div class="container_Book">
        <input class="input_book" name="author" placeholder="автор" />
        <input class="input_book" name="name" placeholder="название" />
        <input class="input_book" name="price" placeholder="стоимость" />
        <input class="input_book" name="library" placeholder="библиотека" />
        <input
          class="input_book"
          name="qty"
          placeholder="кол-во"
          type="number"
        />
        <button @click="addBook">добавить книгу</button>
      </div>
    </form>
  </div>
  <h1 class="warningUser" v-else>Вам не доступен данный контент</h1>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "addBook",
  data() {
    return {
      library: [],
    };
  },
  methods: {
    addBook() {
      let form = document.forms.addBook.elements;
      firebase.firestore().collection("books").add({
        author: form.author.value,
        name: form.name.value,
        price: form.price.value,
        library: form.library.value,
        qty: form.qty.value,
        availability: true,
      });
    },
  },
  created() {
    console.log(this.$store.getters.info.role);
    // доделать селект выбора библиотеки (осталось вывести)
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
