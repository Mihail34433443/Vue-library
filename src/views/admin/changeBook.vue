<template>
  <div class="changeBook">
    <h1 class="title">ИЗМЕНИТЬ КНИГУ</h1>
    <div class="container_Book">
      <input class="input_book" placeholder="название" v-model="book.name" />
      <input class="input_book" placeholder="автор" v-model="book.author" />
      <select class="input_book" v-model="book.library">
        <option
          v-for="item in library"
          :selected="book.library == item"
          v-bind:value="item.name"
          :key="item.id"
        >
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
</template>

<script>
import { changeBook, openBook, getLibrary } from '../../services/bookService'

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
      changeBook(this);
    },
  },
  async mounted() {
    openBook(this)
    this.library = await getLibrary()
  },
};
</script>
