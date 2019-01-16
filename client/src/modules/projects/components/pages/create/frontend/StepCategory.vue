<template>
  <form>
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/025-web.svg" /><span>Should we use any framework ?</span></h1>
    </section>
    <div class="project-create_categoryList">
      <ul>
        <li>
          <router-link to="/client-area/projects/create/frontend/template">
            <img src="/static/img/svg/025-web.svg" />
            <span>Only template</span>
          </router-link>
        </li>
        <li>
          <router-link to="/client-area/projects/create/frontend/react">
            <img src="/static/img/svg/025-web.svg" />
            <span>React</span>
          </router-link>
        </li>
        <li>
          <router-link to="/client-area/projects/create/frontend/vuejs">
            <img src="/static/img/svg/025-web.svg" />
            <span>Vuejs</span>
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
      categories: {

      }
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
