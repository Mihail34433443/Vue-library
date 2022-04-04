<template>
  <div class="orders">
    <adminCatalogOrders />
  </div>
</template>

<script>
import adminCatalogOrders from "../../components/admin/ordersCatalog";

export default {
  name: "orders",
  components: {
    adminCatalogOrders,
  },
};
</script>
