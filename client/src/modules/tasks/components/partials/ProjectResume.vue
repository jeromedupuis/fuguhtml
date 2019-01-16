<template>
  <div class="project-project_resume">
    <div class="project-project_resumeRow">
      <div class="project-project_resumeCell">
        <label>Task count</label>
        <p class="text--length">{{ length }}</p>
      </div>
      <div class="project-project_resumeCell">
        <label>Progression</label>
        <p class="text--progression">{{ progression }}<span>%</span></p>
      </div>
      <div class="project-project_resumeCell">
        <label>Days left</label>
        <p class="text--days_left">{{ days_left }}</p>
      </div>
      <div class="project-project_resumeCell">
        <label>Start date</label>
        <p class="text--startAt">{{ project.startAt | moment('YYYY/MM/DD HH:mm') }}</p>
      </div>
      <div class="project-project_resumeCell">
        <label>Due date</label>
        <p class="text--dueAt">{{ project.dueAt | moment('YYYY/MM/DD HH:mm') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/partials/resume.scss";
</style>

<script>
import moment from 'moment';
import _ from 'lodash';

export default {
  computed: {
    project() {
      return this.$store.getters.currentProject;
    },
    tasks() {
      return this.$store.getters.projectTasks;
    },
    length() {
      return this.$store.getters.projectTaskLength;
    },
    progression() {
      if(_.isEmpty(this.tasks)) {
        return 0;
      }
      return _.meanBy(this.tasks, 'progression');
    },
    days_left() {
      let a = moment();
      let b = moment(this.project.dueAt);
      let d = b.diff(a, 'days');
      return d < 0 ? 0 : d;
    }
  }
};
</script>
