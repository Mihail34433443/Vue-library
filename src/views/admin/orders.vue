<template>
  <div v-if="this.$store.getters.info.role === 'admin'" class="orders">
    <adminCatalogOrders />
  </div>
  <h1 class="warningUser" v-else>Вам не доступен данный контент</h1>
</template>

<script>
import adminCatalogOrders from "../../components/admin/order-catalog";

export default {
  name: "orders",
  components: {
    adminCatalogOrders,
  },
};
</script>
