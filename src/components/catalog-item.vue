<template>
  <div class="catalog-item">
    <div v-if="book_data.availability == true" class="container_catalogItem">
      {{ book_data.name }}
      <button @click="bookClick">заказать</button>
    </div>
    <div v-else class="container_catalogItem">
      {{ book_data.name }}
      <p class="warning">нет в наличии</p>
      <button disabled>заказать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "catalog-item",
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
