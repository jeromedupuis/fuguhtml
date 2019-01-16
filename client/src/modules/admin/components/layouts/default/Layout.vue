<template>
  <div class="layout-clientArea">
    <layout-header />
    <div class="layout-clientArea_wrapper">
      <layout-sidebar />
      <div class="layout-clientArea_slot">
        <slot />
      </div>
    </div>
    <sidebar-comment />
  </div>
</template>

<style lang="sass">
  @import "../../../../../assets/sass/variables.scss";
  @import "../../../assets/sass/layouts/default.scss";
</style>

<script>
import LayoutHeader from './Header';
import LayoutSidebar from './Sidebar';

export default {
  components: {
    'layout-header': LayoutHeader,
    'layout-sidebar': LayoutSidebar
  }
};
</script>
