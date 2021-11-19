<template>
  <div class="cart">
    <h1 class="title">КОРЗИНА</h1>
    <cartItem v-for="book in books" :key="book.id" v-bind:book_data="book" />
    <button @click="addOrder">Заказать</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import cartItem from "../components/cart-item.vue";

export default {
  name: "cart",
  data() {
    return {
      books: [],
      cart: [],
    };
  },
  components: {
    cartItem,
  },
  computed: {
    info() {
      return this.$store.getters.info;
    },
  },
  watch: {
    async info(newInfo) {
      console.log(newInfo);
      if (newInfo.role == undefined) {
        var desired = localStorage.getItem("desired");
        if (desired != null) {
          desired = JSON.parse(desired);
          for (let i = 0; i < desired.arrayDesired.length; i++) {
            await firebase
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
      if (newInfo.role == "user") {
        await firebase
          .firestore()
          .collection("cart")
          .where("user", "==", this.$store.getters.info.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.cart.push({
                id: doc.id,
                book: doc.data().book,
                qty: doc.data().qty,
              });
            });
          });
        for (let i = 0; i < this.cart.length; i++) {
          await firebase
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
  },
  methods: {
    addOrder() {
      firebase
        .firestore()
        .collection("order")
        .add({
          user: this.$store.getters.info.id,
          books: this.cart,
          status: "new",
        })
        .then(() => {
          for (let i = 0; i < this.cart.length; i++) {
            firebase
              .firestore()
              .collection("cart")
              .doc(this.cart[i].id)
              .delete();
          }
          this.books = [];
          this.cart = [];
          console.log("ваш заказ принят");
        });
    },
  },
  async mounted() {},
};
</script>