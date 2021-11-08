<template>
  <div class="orders">
    <adminCatalogOrders />
  </div>
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
