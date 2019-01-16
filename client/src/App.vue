<template>
  <div id="app">
    <router-view />
    <vue-progress-bar />
    <module-notification />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="sass">
  @import "./assets/sass/app.scss";
</style>
