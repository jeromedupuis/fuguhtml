<template>
  <layout-area classname="page--projectResume">
    <slot-header-title title="Project Resume" :icon="null" />

    <template v-if="isClient">
      <resume-client />
    </template>
    <template v-else-if="isFreelancer">
      <resume-freelancer />
    </template>

    <section class="page-resume_comment">
      <div class="ui-page-title">
        <h2>Resume comments</h2>
      </div>
      <page-comment :reference="`resume`" :doc="currentProject._id" />
    </section>

  </layout-area>
</template>

<script>
import _ from 'lodash';
import ResumeClient from './Client';
import ResumeFreelancer from './Freelancer';
import { mapGetters } from 'vuex';

export default {
  components: {
    ResumeClient,
    ResumeFreelancer
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'isClient',
      'isFreelancer'
    ]),
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
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "../../../assets/sass/pages/resume.scss";

  .page-resume_comment {
    padding:48px;
  }
</style>
