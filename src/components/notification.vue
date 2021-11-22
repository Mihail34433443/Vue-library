<template>
  <div
    class="notification"
    v-bind:class="{ visibility: display, access: state }"
  >
    {{ message_data.title }}
    {{ message_data.text }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message_data: {
        text: "",
        state: "",
        title: "",
      },
      display: false,
      state: false,
    };
  },
  computed: {
    message() {
      return this.$store.getters.message;
    },
  },
  watch: {
    message(newMessage) {
      if (newMessage != null) {
        this.message_data = newMessage;
        this.display = true;
        this.state = newMessage.state;
        setTimeout(() => {
          this.display = false;
        }, 2000);
      }
    },
  },
};
</script>