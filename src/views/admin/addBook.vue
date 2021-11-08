<template>
  <div class="addBook">
    <h1 class="title">ДОБАВИТЬ КНИГУ</h1>
    <form name="addBook" onsubmit="return false;">
      <div class="container_addBook">
        <input class="input_addbook" name="author" placeholder="автор" />
        <input class="input_addbook" name="name" placeholder="название" />
        <input class="input_addbook" name="price" placeholder="стоимость" />
        <input class="input_addbook" name="library" placeholder="библиотека" />
        <button @click="addBook">добавить книгу</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: 'addBook',
  methods: {
    addBook() {
      let form = document.forms.addBook.elements;
      firebase.firestore().collection("books").add({
        author: form.author.value,
        name: form.name.value,
        price: form.price.value,
        library: form.library.value,
        availability: true,
      });
    },
  },
};
</script>
