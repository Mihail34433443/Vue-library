<template>
  <div class="orderItem">
    <div class="container_orderItem">
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
