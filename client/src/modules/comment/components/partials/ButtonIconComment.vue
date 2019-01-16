<template>
  <button class="sidebar-comment-button--icon" @click.prevent="onSidebarButtonTrigger" v-if="hasModuleAccess('comment')"></button>
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

<style lang="scss" scoped>
  .sidebar-comment-button--icon {
    background-image: url(/static/img/svg/020-comment.svg);
    background-size:auto 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: all .2s cubic-bezier(0,0,.58,1);
    width: 24px;
    height: 22px;
    border:none;
    -webkit-appearance: none;
    box-shadow: none;
    display:inline-block;
    vertical-align: middle;
  }
</style>
