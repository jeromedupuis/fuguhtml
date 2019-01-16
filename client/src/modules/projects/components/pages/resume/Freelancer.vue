<template>
  <div>
    <template v-if="projectStatus == 'NEW'">
      <p>the project is NEW</p>

      <ui-input-submit label="Accept this project" @click="acceptProject(currentProject)" />
      <ui-input-submit label="Reject this project" @click="rejectProject(currentProject)" />

    </template>
    <template v-else-if="projectStatus == 'CLEARUP'">

      <div v-if="!clearupValidation.client">
        <p>Still waiting for the client's validation</p>
      </div>
      <div v-else>
        <p>Clear up has been validated by the client.</p>
        <ui-input-submit label="Validate details and open the project" @click="validateClearupFreelancer(currentProject)" />
      </div>

    </template>
    <template v-if="projectStatus == 'OPEN'">
      <p>the project is OPEN</p>
    </template>

    <template v-else-if="projectStatus == 'REJECT'">

      <p>This project has been rejected</p>
      <ui-input-submit label="Reopen project" @click="reopenProject(currentProject)" />
    </template>

    <template v-else-if="projectStatus == 'CLOSED'">

      <p>This project has been closed</p>
      <ui-input-submit label="Reopen project" @click="reopenProject(currentProject)" />
    </template>

    <template v-if="projectStatus !== 'NEW' && projectStatus !== 'CLOSED'">

      <ui-input-submit label="Close this project" @click="closeProject(currentProject)" />

    </template>


  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'reopenProject',
      'closeProject',
      'validateClearupFreelancer',
      'rejectProject',
      'acceptProject'
    ])
  },
  computed: {
    ...mapGetters(['currentProject']),
    projectCategory() {
      return _.get(this.currentProject, 'category', null);
    },
    projectStatus() {
      return _.get(this.currentProject, 'status', null);
    },
    clearupValidation() {
      return _.get(this.currentProject, 'clearup.validation', {
        client: false,
        freelancer: false
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../../assets/sass/pages/resume.scss";
</style>
