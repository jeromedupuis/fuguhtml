<template>
  <a class="site-logo" href="/">
    <span ref="siteLogo">
      FUGU HTML <small v-if="subtitle">{{ subtitle }}</small>
    </span>
  </a>
</template>

<style lang="scss" scoped>
  .site-logo {
    color:#222;
    text-decoration: none;
    float: left;
    height: 40px;
    padding: 0 10px;
    font-size: 18px;
    line-height: 20px;
    margin-left: 14px;
    font-family: 'Abel', sans-serif;
    position: relative;
    text-decoration: none;

    span {
      position: relative;
      &:before {
        content: "";
        position: relative;
        background: url(/static/img/svg/017-hook.svg);
        background-size: 100% auto;
        background-repeat: no-repeat;
        width: 38px;
        height: 38px;
        margin: 0 auto;
        display: inline-block;
      }
      &:after {
        background: url(/static/img/fugulogo.gif);
        background-size: 75px auto;
        background-repeat: no-repeat;
        width: 70px;
        height: 75px;
        content: "";
        position: absolute;
        left: -15px;
        top:28px;
        opacity: 0;
        transform: rotate(-45deg) scaleX(-1);
        transition: all ease 800ms;
        pointer-events: none;
      }
      &.fish--hooked {
        vertical-align: bottom;
        width: 38px;
        height: 38px;
        &:after {
          animation: logoFishHooked 800ms infinite;
          animation-delay: 600ms;
          top:12px;
          opacity: 1;
        }
      }
    }
    &.is--inverted {
      span {
        color: white;
        &:before {
          filter: invert(1);
        }
      }
    }
  }
  @keyframes logoFishHooked {
      0% {
        transform: rotate(-45deg) scaleX(-1);
      }
      75% {
        transform: rotate(-55deg) scaleX(-1);
      }
      100% {
        transform: rotate(-45deg) scaleX(-1);
      }
  }
</style>

<script>
export default {
  props: {
    subtitle: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.setSiteLogoScrollingEvent, false);
  },
  destroyed() {
    window.removeEventListener('scroll', this.setSiteLogoScrollingEvent, false);
  },
  methods: {
    setSiteLogoScrollingEvent() {
      let siteHeader = document.getElementById('siteHeader');
      let siteLogo = this.$refs.siteLogo;
      if(window.scrollY > 100) {
        siteLogo.classList.add('fish--hooked');
      } else {
        siteLogo.classList.remove('fish--hooked');
      }

      let pageIndexIntroduction = document.getElementById('pageIndexIntroduction');
      if(pageIndexIntroduction) {
        if(window.scrollY > 100) {
          siteHeader.classList.remove('is--inverted');
        } else {
          siteHeader.classList.add('is--inverted');
        }
      }
    }
  }
};
</script>
