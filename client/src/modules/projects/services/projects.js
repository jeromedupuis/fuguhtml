import Vue from 'vue';
import _ from 'lodash';

export default {
  categoryEnabled: {
    frontend: {
      vuejs: true,
      react: true,
      template: true
    },
    uiux: true,
    photography: true
  },
  async beforeEnterProjects(to, from, next) {
    let me = Vue.$store.getters.getMe;
    await Vue.$store.dispatch('fetchProjectsByOwnerId', {
      ownerId: me._id
    });
    next();
  },
  async beforeEnterOneProject(to, from, next) {
    let me = Vue.$store.getters.getMe;
    let area = Vue.$store.getters.websiteArea;

    if(area == 'client-area') {
      await Vue.$store.dispatch('fetchProjectsByOwnerId', {
        ownerId: me._id
      });
      await Vue.$store.dispatch('setCurrentOwnedProjectById', to.params.projectId);
    }
    else if(area == 'freelancer-area') {
      await Vue.$store.dispatch('fetchProjectsByAssigneeId', {
        ownerId: me._id
      });
      await Vue.$store.dispatch('setCurrentAssignedProjectById', to.params.projectId);
    }


    let currentProject = Vue.$store.getters.currentProject;
    if (_.isEmpty(currentProject)) {
      next('/client-area');
    }
    next();
  }
};
