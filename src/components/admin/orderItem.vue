<template>
  <div class="OrderItem">
    <div class="container_OrderItem">
      {{ book_data.name }}
      {{ book_data.qty }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
