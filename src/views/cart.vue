<template>
  <div class="cart">
    <h1 class="title">КОРЗИНА</h1>
    <cartItem v-for="book in books" :key="book.id" v-bind:book_data="book" />
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import cartItem from "../components/cart-item.vue";

export default {
  data() {
    return {
      books: [],
      cart: [],
    };
  },
  components: {
    cartItem,
  },
  async created() {
    if (this.$store.getters.info.role == undefined) {
      var desired = localStorage.getItem("desired");
      if (desired != null) {
        desired = JSON.parse(desired);
        for (let i = 0; i < desired.arrayDesired.length; i++) {
          firebase
            .firestore()
            .collection("books")
            .doc(desired.arrayDesired[i].id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                this.books.push({
                  id: doc.id,
                  name: doc.data().name,
                  author: doc.data().author,
                  price: doc.data().price,
                  library: doc.data().library,
                  availability: doc.data().availability,
                  qty: desired.arrayDesired[i].qty,
                });
              }
            });
        }
      }
    }
    if (this.$store.getters.info.role == "user") {
      await firebase
        .firestore()
        .collection("cart")
        .where("user", "==", this.$store.getters.info.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.cart.push({
              book: doc.data().book,
              qty: doc.data().qty,
            });
          });
        });
      for (let i = 0; i < this.cart.length; i++) {
        firebase
          .firestore()
          .collection("books")
          .doc(this.cart[i].book)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.books.push({
                id: doc.id,
                name: doc.data().name,
                author: doc.data().author,
                price: doc.data().price,
                library: doc.data().library,
                availability: doc.data().availability,
                qty: this.cart[i].qty,
              });
            }
          });
      }
    }
  },
};
</script>