<template>
  <div class="addBook">
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
</template>

<script>
import { addBook, getLibrary } from '../../services/bookService';

export default {
  name: "addBook",
  data() {
    return {
      newBook: {
        author: "",
        name: "",
        price: "",
        library: "",
        qty: "",
        availability: false,
      },
      library: [],
    };
  },
  methods: {
    addBook() {
      addBook(this.newBook)
    },
  },
  async created() {
    this.library = await getLibrary()
  },
};
</script>
