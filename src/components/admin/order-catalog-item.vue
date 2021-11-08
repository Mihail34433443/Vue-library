<template>
  <div class="order-catalog-item">
    <div class="container_catalogItem">
      {{ order_data.book }}
      <button @click="orderClick">открыть</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-catalog-item",
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
  },
};
</script>
