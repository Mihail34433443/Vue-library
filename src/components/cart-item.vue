<template>
  <div class="cart-item">
    <div class="container_cartItem">
      {{ book_data.name }}
      <button @click="bookClick">открыть</button>
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
  methods: {
    bookClick() {
      this.$emit("bookClick", this.book_data.id);
    },
  },
};
</script>
