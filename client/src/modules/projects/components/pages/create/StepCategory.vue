<template>
  <form>
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/026-shopping-list.svg" /><span>What kind of project ?</span></h1>
    </section>
    <div class="project-create_categoryList">
      <ul>
        <li v-if="hasFrontend">
          <router-link to="/client-area/projects/create/frontend">
            <img src="/static/img/svg/025-web.svg" />
            <span>Front End</span>
          </router-link>
        </li>
        <li v-if="categoryEnabled.uiux">
          <router-link to="/client-area/projects/create/uiux">
            <img src="/static/img/svg/028-vector.svg" />
            <span>UI/UX</span>
          </router-link>
        </li>
        <li v-if="categoryEnabled.photography">
          <router-link to="/client-area/projects/create/photography">
            <img src="/static/img/svg/027-camera.svg" />
            <span>Photography</span>
          </router-link>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

export default {
  data() {
    return {
      categoryEnabled: Vue.$service.projects.categoryEnabled,
      categories: {}
    };
  },
  computed: {
    hasBackend() {
      let backend = _.values(this.backend).filter((x) => { return x === true; });
      if(_.isEmpty(backend)) {
        return false;
      }
      return true;
    },
    frontend() {
      return _.get(this.categoryEnabled, 'frontend', {});
    },
    hasFrontend() {
      let frontend = _.values(this.frontend).filter((x) => { return x === true; });
      if(_.isEmpty(frontend)) {
        return false;
      }
      return true;
    },
    backend() {
      return _.get(this.categoryEnabled, 'backend', {});
    },
  }
};
</script>

<style lang="scss" scoped>
  .project-create_categoryList {
    text-align:center;
    list-style: none;
    li {
      display:inline-block;
      margin: 20px;
      text-align:center;
      a {
        width: 80px;
        display:inline-block;
        height: auto;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
