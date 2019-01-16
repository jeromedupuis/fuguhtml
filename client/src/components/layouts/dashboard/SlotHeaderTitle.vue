<template>
  <section class="layout-clientArea_slot_headerTitle">
    <div class="header-title_left" v-if="back">
      <router-link :to="backTo">
        <img :src="icon" alt="" />
      </router-link>
    </div>
    <h1>{{ title }}</h1>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    back: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: '/static/img/svg/030-back.svg'
    }
  },
  computed: {
    backTo() {
      if(this.back === true) {
        return `/${this.websiteArea}/projects`;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .layout-clientArea_slot_headerTitle {
    padding:24px 0;
    padding-left:24px;
    height: 70px;
    margin: -24px -24px 0 -24px;
    position: relative;
    background: #f8f8f8;
    border-bottom: 1px solid #e5e5e5;
    font-family: 'Abel', sans-serif;
    margin-bottom: 22px;

    .header-title_left {
      float:left;
      margin-right: 22px;
      height: 24px;

      a {
        display: block;
        height: 44px;
        width: 44px;
        position: relative;
        top: -10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
