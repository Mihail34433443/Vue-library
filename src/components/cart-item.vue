<template>
  <div class="cart-item">
    <div class="container_cartItem">
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
