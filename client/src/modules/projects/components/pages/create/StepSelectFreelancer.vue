<template>
  <form>

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else>
      <section class="project-create_formTitle">
        <h1><img src="/static/img/svg/012-chess-piece.svg" /><span>This is our Freelancer</span></h1>
      </section>
      <section class="project-create_stepFreelancer">
        <template v-if="hasNoFreelancer">
          There is freelancer available right now.
        </template>
        <template v-else>
          <div class="project-create_stepFreelancerItem" v-for="(freelancer, index) in freelancers" :key="index">
            <p><label><ui-input-radio v-model="selectedFreelancer" :inputValue="freelancer" /> <span>{{ freelancer.firstname }} {{ freelancer.lastname }}</span></label></p>
          </div>
        </template>
      </section>
    </template>
  </form>
</template>

<script>

import Vue from 'vue';
import _ from 'lodash';

export default {
  data() {
    return {
      isPageLoading: false,
      hasNoFreelancer: false,
      freelancers: [],
      selectedFreelancer: null
    };
  },
  computed: {
    newProject() {
      return this.$store.getters.newProject;
    },
    category() {
      return this.newProject.category;
    },
    subcategory() {
      return this.newProject.subcategory;
    }
  },
  async mounted() {
    this.isPageLoading = true;
    this.freelancers = await Vue.$api.get('/users', {
      params: {
        isFreelancer: 1,
        category: this.category,
        subcategory: this.subcategory
      }
    });
    if(_.isEmpty(this.freelancers)) {
      this.hasNoFreelancer = true;
    } else {
      if(_.isArray(this.freelancers) && this.freelancers.length == 1) {
        this.selectedFreelancer = _.head(this.freelancers);
        Vue.$bus.$emit('createProjectNextStep');
      }
    }
    this.isPageLoading = false;

  },
  destroyed() {
    this.setNewProjectInfo();
  },
  methods: {
    setNewProjectInfo() {
      let freelancer = this.selectedFreelancer;
      if(!freelancer) {
        return false;
      }

      this.$store.dispatch('setNewProjectInfo', {
        assignee: {
          userId: freelancer._id,
          firstname: freelancer.firstname,
          lastname: freelancer.lastname,
          email: freelancer.email
        }
      });
    }
  }
};
</script>
