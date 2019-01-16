<template>
  <layout-clientarea-nosidebar class="page--index">

  </layout-clientarea-nosidebar>
</template>

<style lang="sass" scoped>
  @import "../../../assets/sass/pages/index.scss";
</style>

<script>

export default {
  async created() {
    this.$router.push('/freelancer-area/projects');
  },
};
</script>
