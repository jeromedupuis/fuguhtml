<template>
  <div>
    <template v-if="projectStatus == 'NEW'">

      <p>the project is NEW</p>
      <p>Still waiting for the FUGU 's acception</p>

    </template>
    <template v-else-if="projectStatus == 'CLEARUP'">

      <div v-if="!clearupValidation.client">
        <p>Clear up detail is not validated</p>
        <ui-input-submit label="Validate cleared up details" @click="validateClearupClient(currentProject)" />
      </div>
      <div v-else>
        <p>Clear up detail has been validated</p>
        <p>Waiting for FUGU's Freelancer's validation</p>
      </div>

    </template>
    <template v-if="projectStatus == 'OPEN'">
      <p>the project is OPEN</p>
    </template>

    <template v-else-if="projectStatus == 'REJECT'">
      <p>This project has been rejected</p>
    </template>

    <template v-else-if="projectStatus == 'CLOSED'">
      <p>This project has been closed</p>
    </template>

  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'validateClearupClient'
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

  .page-resume_comment {
    padding:48px;
  }
</style>
