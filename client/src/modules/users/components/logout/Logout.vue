<template>
  <div>Logging out...</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('logout');
    this.$router.push('/');
  }
};
</script>
