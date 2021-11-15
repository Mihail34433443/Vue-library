<template>
  <div class="cart">
    <h1 class="title">КОРЗИНА</h1>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      books: [],
    };
  },
  created() {
    if (this.$store.getters.info.role == undefined) {
      var desired = localStorage.getItem("desired");
      if (desired != null) {
        desired = JSON.parse(desired);
        for (var i = 0; i < desired.arrayDesired.length; i++) {
          console.log(i);
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
                  qty: desired.arrayDesired[0].qty, //спросить почему не понимает что такое [i]
                });
              }
            });
        }
      }
    }
  },
};
</script>