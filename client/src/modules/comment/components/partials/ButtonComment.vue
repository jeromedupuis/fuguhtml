<template>
  <button class="p-lean-canvas-main__comment" @click.prevent="onSidebarButtonTrigger" v-if="hasModuleAccess('comment')"></button>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    doc: {
      type: String,
      required :true
    }
  },
  methods: {
    onSidebarButtonTrigger() {
      Vue.$bus.$emit("setSidebarComment", {
        reference: this.reference,
        doc: this.doc,
        title: this.title
      });
      return false;
    }
  }
};
</script>
