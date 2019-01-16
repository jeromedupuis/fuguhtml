<template>
  <div>
    <h1>Tasks</h1>
    <section class="project-clearup_fieldsList">
      <table width="100%" class="ui-table col--noborder">
        <thead>
          <tr>
            <th>No</th>
            <th>Subject</th>
            <th></th>
          </tr>
          <tr class="thead--adjustement"></tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in clearUpTasks" :key="index">
            <td></td>
            <td class="col--subject">
              <span>{{ task.subject }}</span>
            </td>
            <td class="col--comment" width="40">
              <template v-if="hasModuleAccess('comment')">
                <button-icon-sidebar-comment :reference="`clearUpTask-${task._id}`" :doc="currentProject._id" :title="`${task.subject}`" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>

    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import Vue from 'vue';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
      clearUpFields: []
    };
  },
  destroyed() {
    Vue.$bus.$emit('updateClearUp', 'tasks', this.clearUpFields);
  },
  watch: {
    clearUpTasks: {
      handler(value) {
        if(this.isLoading === false) {
          setTimeout(() => {
            Vue.$bus.$emit('updateClearUp', 'tasks', value);
          }, 500);
        }
        if(this.isLoading === true) {
          this.isLoading = false;
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'isClient',
      'isFreelancer'
    ]),
    clearup() {
      return _.clone(_.get(this.currentProject, 'clearup', {}));
    },
    clearUpTasks() {
      return _.get(this.clearup, 'tasks', []);
    }
  }
};
</script>

<style lang="scss" scoped>
  .ui-table {
    overflow: visible;
    tr td {
      vertical-align: top;
    }
  }
  .ui-select, .ui-input--text {
    min-width: 200px;
  }
  .project-clearup_fieldsList {
    tr td {
      padding-top:6px;
      padding-bottom:6px;
    }
  }
  .text--note {
    color:#999;
    font-style: italic;
    font-size: 10px;
    line-height: 10px;
    display:block;
  }
  .ui-textarea {
    max-width: 505px;
    width: 100%;
    min-width: auto;
  }
</style>
