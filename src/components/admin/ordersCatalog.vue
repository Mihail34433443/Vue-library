<template>
  <div class="catalog">
    <h1 class="title">ЗАКАЗЫ</h1>
    <catalogItem
      v-for="order in orders"
      :key="order.id"
      v-bind:order_data="order"
      @orderClick="orderClick"
      @deleteOrder="deleteOrder"
    />
  </div>
</template>

<script>
import catalogItem from "./ordersCatalogItem";

import { getOrders, deleteOrder } from "../../services/bookService";

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
    deleteOrder(id) {
      deleteOrder(id);
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id == id) {
          this.orders.splice(i, 1);
          break;
        }
      }
    },
    orderClick(id) {
      this.$router.push({ name: "order", query: { order: id } });
    },
  },
  async created() {
    this.orders = await getOrders()
  },
};
</script>
