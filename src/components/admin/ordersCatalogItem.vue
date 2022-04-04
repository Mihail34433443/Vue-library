<template>
  <div class="ordersCatalogItem">
    <div class="container_catalogItem">
      {{ order_data.id }}
      {{ order_data.status }}
      <button @click="orderClick">открыть</button>
      <button @click="deleteOrder">удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ordersCatalogItem",
  props: {
    order_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    orderClick() {
      this.$emit("orderClick", this.order_data.id);
    },
    deleteOrder() {
      this.$emit("deleteOrder", this.order_data.id);
    },
  },
};
</script>
