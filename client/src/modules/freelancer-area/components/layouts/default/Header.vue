<template>
  <div class="layout-freelancerArea_header bg--gradient" id="siteHeader">
    <site-logo class="is--inverted" subtitle="Freelancer Area" />

    <nav class="layout-freelancerArea_nav">
      <ul>
        <li>
          <button class="button-notification--header" />
        </li>
        <li>
          <router-link :to="{ name: 'PageFreelancerArea' }">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/logout">Logout</router-link>
        </li>
        <li>
          <template v-if="locale == 'en'">
            <button class="button-setlocale" @click="setLang('ja')">EN</button>
          </template>
          <template v-if="locale == 'ja'">
            <button class="button-setlocale" @click="setLang('en')">JA</button>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  .button-notification--header {
    background-image: url(/static/img/svg/021-notification.svg);
    background-size:auto 100%;
    background-color: transparent;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: all .2s cubic-bezier(0,0,.58,1);
    width: 19px;
    height: 19px;
    border:none;
    -webkit-appearance: none;
    box-shadow: none;
    display:inline-block;
    vertical-align: middle;
    filter: invert(1);
  }
</style>

<script>
export default {
  computed: {
    locale() {
      return this.$store.state.lang.locale;
    }
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch('setLang', lang);
    }
  }
};
</script>
