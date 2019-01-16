export default {
  computed: {
    me() {
      return this.$store.getters.getMe;
    }
  }
};
