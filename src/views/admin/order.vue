<template>
  <div class="order">
    <orderItem v-for="book in books" :key="book.id" v-bind:book_data="book" />
    <button @click="orderBook">Одобрить</button>
  </div>
</template>

<script>
import orderItem from '../../components/admin/orderItem.vue'
import firebase from "firebase/compat/app";

export default {
  name: "order",
  data() {
    return {
      books: {},
    };
  },
  components: {
    orderItem,
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
  async created() {
    await firebase
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
  },
};
</script>
