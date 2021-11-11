<template>
  <div class="catalog">
    <h1 class="title">ЗАКАЗЫ</h1>
    <catalogItem
      v-for="order in orders"
      :key="order.id"
      v-bind:order_data="order"
      @orderClick="orderClick"
    />
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import catalogItem from "./order-catalog-item";

export default {
  name: "catalog",
  components: {
    catalogItem,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    orderClick(id) {
      this.$router.push({ name: "order", query: { order: id } });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("order")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.orders.push({
            id: doc.id,
            addDate: doc.data().addDate,
            book: doc.data().book,
            dropDate: doc.data().dropDate,
            user: doc.data().user,
          });
        });
      });
  },
};
</script>
