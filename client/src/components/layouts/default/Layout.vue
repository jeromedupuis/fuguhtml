<template>
  <div class="layout-default">

    <layout-header :class="headerClass" />
    <div class="layout-default_wrapper">
      <div class="layout-default_body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import "../../../assets/sass/variables.scss";
  @import "../../../assets/sass/layouts/default.scss";
</style>

<script>
import LayoutHeader from './Header';
import LayoutSidebar from './Sidebar';

export default {
  components: {
    'layout-header': LayoutHeader,
    'layout-sidebar': LayoutSidebar
  },
  props: {
    headerClass: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>
