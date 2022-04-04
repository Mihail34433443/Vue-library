<template>
  <div class="profile">
    <h1 class="title">ПРОФИЛЬ</h1>
    <div class="container_profile">
      <div class="profile_fio">Ваше ФИО: {{ fio }}</div>
      <div class="profile_phone">Ваш телефон: {{ phone }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  computed: {
    fio() {
      return this.$store.getters.info.fio;
    },
    phone() {
      return this.$store.getters.info.phone;
    },
  },
};
</script>
