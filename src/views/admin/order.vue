<template>
  <div class="order">
    <orderItem v-for="book in books" :key="book.id" v-bind:book_data="book" />
    <p>Статус: {{ status }}</p>
    <button @click="updateOrderStatus">Одобрить</button>
  </div>
</template>

<script>
import orderItem from "../../components/admin/orderItem.vue";
import {
  getOrder,
  getOrderStatus,
  updateOrderStatus,
} from "../../services/bookService";

export default {
  name: "order",
  data() {
    return {
      books: [],
      status: "",
    };
  },
  components: {
    orderItem,
  },
  methods: {
    updateOrderStatus() {
      updateOrderStatus(this.$route.query.order);
      this.status = "approved";
    },
  },
  async created() {
    this.books = await getOrder(this.$route.query.order);
    this.status = await getOrderStatus(this.$route.query.order);
  },
};
</script>
