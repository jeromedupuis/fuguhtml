<template>
  <layout-area classname="page--projectTasks">
    <slot-header-title title="Task list" :icon="null" />

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else>
      <div class="section-container">
        <project-resume />
      </div>

      <div class="ui-table col--noborder" v-if="tasks">
        <table>
          <thead>
            <tr>
              <th class="col--checkbox"><ui-input-checkbox v-model="checkAll" /></th>
              <th class="col--id">#</th>
              <th>Category</th>
              <th>Function</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Updated</th>
              <th></th>
            </tr>
            <tr class="thead--adjustement"></tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
              <th class="col--checkbox"><ui-input-checkbox v-model="task.check" /></th>
              <td class="col--id">
                <router-link :to="task.link">{{ task.taskId }}</router-link>
              </td>
              <td>{{ task.category | capitalize }}</td>
              <td>{{ task.function | capitalize }}</td>
              <td>
                <router-link :to="task.link">{{ task.subject }}</router-link>
              </td>
              <td>{{ task.status | capitalize }}</td>
              <td>{{ task.assignee }}</td>
              <td>{{ task.updatedAt || task.createdAt | moment('YYYY/MM/DD HH:mm') }}</td>
              <td>
                <template v-if="task.commentFlg && hasModuleAccess('comment')">
                  <button-icon-sidebar-comment reference="tasks" :doc="task._id" :title="task.subject" />
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </layout-area>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/pages/tasks.scss";
</style>

<script>
import _ from 'lodash';

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkAll: false,
      isPageLoading: false
    };
  },
  computed: {
    tasks() {
      let tasks = this.$store.getters.projectTasks;
      if(_.isEmpty(tasks)) return [];
      tasks.map((x) => {
        x.check = this.checkAll;
        x.link = "/client-area/projects/"+this.projectId+"/tasks/"+x.id;
      });
      return tasks;
    }
  },
  methods: {
    onSelectAll(bool) {
      this.datas.map(x => (x.check = bool));
    }
  },
  async created() {
    this.isPageLoading = true;
    await this.$store.dispatch('fetchTasks', {
      projectId: this.projectId
    });
    this.isPageLoading = false;
  }
};
</script>
