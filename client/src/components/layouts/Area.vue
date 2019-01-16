<template>
  <div>
    <template v-if="area == 'layout-clientarea'">
      <layout-clientarea :class="classname">
        <slot />
      </layout-clientarea>
    </template>
    <template v-else-if="area == 'layout-freelancerarea'">
      <layout-freelancerarea :class="classname">
        <slot />
      </layout-freelancerarea>
    </template>
    <template v-else-if="area == 'layout-clientarea-nosidebar'">
      <layout-clientarea-nosidebar :class="classname">
        <slot />
      </layout-clientarea-nosidebar>
    </template>
    <template v-else-if="area == 'layout-freelancerarea-nosidebar'">
      <layout-freelancerarea-nosidebar :class="classname">
        <slot />
      </layout-freelancerarea-nosidebar>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    classname: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    area() {
      if(this.suffix) {
        return `${this.getAreaLayout}-${this.suffix}`;
      }
      return this.getAreaLayout;
    }
  }
};
</script>
