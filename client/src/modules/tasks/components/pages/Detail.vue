<template>
  <layout-area classname="page--projectTasks">

    <template v-if="hasNoData">
      <slot-header-title :title="$t('Task')" :back="true" :backTo="`/client-area/projects/${projectId}/tasks`" />
    </template>
    <template v-else-if="task">
      <slot-header-title :title="$t('Task')+' #'+task.taskId" :back="true" :backTo="`/client-area/projects/${projectId}/tasks`" />
    </template>

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else-if="hasNoData">
      <section class="section-container">
        <p class="text--center">No data</p>
      </section>
    </template>
    <template v-else>
      <section class="task-detail_container">
        <h2>{{ task.subject }}</h2>

        <div class="task-detail_attributes">
          <div class="task-detail_attributesContent--left">
            <ul class="task-detail_attributesList">
              <li>
                <span class="attribute-label">Status</span>
                <span class="attribute-value">{{ task.status }}</span>
              </li>
              <li>
                <span class="attribute-label">Category</span>
                <span class="attribute-value">{{ task.category }}</span>
              </li>
              <li>
                <span class="attribute-label">Tracker</span>
                <span class="attribute-value">{{ task.tracker }}</span>
              </li>
              <li>
                <span class="attribute-label">Function</span>
                <span class="attribute-value">{{ task.function }}</span>
              </li>
              <li>
                <span class="attribute-label">Assignee</span>
                <span class="attribute-value">{{ task.assignee }}</span>
              </li>
              <li v-if="task.parentTask">
                <span class="attribute-label">Parent task</span>
                <span class="attribute-value">{{ task.parentTask }}</span>
              </li>
            </ul>
          </div>
          <div class="task-detail_attributesContent--right">
          <ul class="task-detail_attributesList">
            <li>
              <span class="attribute-label">Date created</span>
              <span class="attribute-value">{{ task.createdAt | moment('YYYY/MM/DD HH:mm') }}</span>
            </li>
            <li>
              <span class="attribute-label">Last updated</span>
              <span class="attribute-value">{{ task.updatedAt | moment('YYYY/MM/DD HH:mm') }}</span>
            </li>
            <li>
              <span class="attribute-label">Start date</span>
              <span class="attribute-value">{{ task.startAt | moment('YYYY/MM/DD HH:mm') }}</span>
            </li>
            <li>
              <span class="attribute-label">Due date</span>
              <span class="attribute-value">{{ task.dueAt | moment('YYYY/MM/DD HH:mm') }}</span>
            </li>
            <li>
              <span class="attribute-label">Progression</span>
              <span class="attribute-value">{{ task.progression }}%</span>
            </li>
          </ul>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="task-detail_description" v-if="task.description">
          <hr />
          <h2>Description</h2>
          <div class="text--description" v-html="task.description"></div>
        </div>
      </section>
      <page-comment reference="tasks" :doc="task.id" :comments="task.comments" />
    </template>
  </layout-area>
</template>

<style lang="sass">
  @import "../../assets/sass/pages/task_detail.scss";
</style>

<script>
import _ from 'lodash';
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPageLoading: true
    };
  },
  computed: {
    task() {
      return this.$store.getters.projectTask(this.id);
    },
    hasNoData() {
      return (this.isPageLoading === false && _.isEmpty(this.task));
    },
  },
  async mounted() {
    this.isPageLoading = true;
    await this.$store.dispatch('fetchOneTask', {
      projectId: this.projectId,
      id: this.id
    });
    this.isPageLoading = false;
  }
};
</script>
