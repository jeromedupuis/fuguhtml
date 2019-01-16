<template>
  <div>
    <h1>{{ title }}</h1>
    <section class="project-clearup_fieldsList">
      <table width="100%" class="ui-table col--noborder">
        <thead>
          <tr>
            <th width="160"></th>
            <th width="240"></th>
            <th width="240">Client choice</th>
            <th width="220">Freelancer suggestion</th>
            <th></th>
          </tr>
          <tr class="thead--adjustement"></tr>
        </thead>
        <tbody>
          <tr v-for="(field, index) in clearUpFields" :key="index">
            <td class="col--label" width="160">
              <span>{{ field.label }}</span>
            </td>
            <td class="col--question">
              <p>
                {{ field.question }}
                <small v-if="field.note" class="text--note" v-html="`※ ${field.note}`"></small>
              </p>
            </td>

            <td
              class="col--valueClient"
              :colspan="field.twoCols ? 2 : 1"
              :width="field.twoCols ? 440 : 220"
            >
              <template v-if="field.inputType == 'select'">
                <ui-select :options="field.options" v-model="field.value.client" :style="{ zIndex: 100-index}" :disabled="isFreelancer" />
              </template>
              <template v-else-if="field.inputType == 'input'">
                <ui-input-text v-model="field.value.client" :disabled="isFreelancer" />
              </template>
              <template v-else-if="field.inputType == 'number'">
                <ui-input-number v-model="field.value.client" :disabled="isFreelancer" />
              </template>
              <template v-else-if="field.inputType == 'textarea'">
                <textarea class="ui-textarea" v-model="field.value.client" :disabled="isFreelancer"></textarea>
              </template>
              <template v-else-if="field.inputType == 'datepicker'">
                <ui-datepicker v-model="field.value.client" :style="{zIndex: 100-index, minWidth: '200px' }" :disabledPicker="isFreelancer" />
              </template>
              <template v-else-if="field.inputType == 'switch'">
                <ui-input-switch-checkbox v-model="field.value.client" :disabled="isFreelancer" />
                <span>{{ field.value.client ? 'YES' : 'NO' }}</span>
              </template>
            </td>
              <template v-if="!field.twoCols">
                <td class="col--valueFreelancer" width="220">
                  <template v-if="!field.onlyClient">
                    <template v-if="field.inputType == 'select'">
                      <ui-select :options="field.options" v-model="field.value.freelancer" :disabled="isClient" :style="{ zIndex: 100-index}" />
                    </template>
                    <template v-else-if="field.inputType == 'input'">
                      <ui-input-text v-model="field.value.freelancer" :disabled="isClient" />
                    </template>
                    <template v-else-if="field.inputType == 'number'">
                      <ui-input-number v-model="field.value.freelancer" :disabled="isFreelancer" />
                    </template>
                    <template v-else-if="field.inputType == 'textarea'">
                      <textarea class="ui-textarea" v-model="field.value.freelancer"></textarea>
                    </template>
                    <template v-else-if="field.inputType == 'datepicker'">
                      <ui-datepicker v-model="field.value.freelancer" :disabledPicker="isClient" :style="{minWidth: '200px' }" />
                    </template>
                    <template v-else-if="field.inputType == 'switch'">
                      <ui-input-switch-checkbox v-model="field.value.freelancer" :disabled="isClient" />
                      <span>{{ field.value.freelancer ? 'YES' : 'NO' }}</span>
                    </template>
                  </template>
                </td>
            </template>

            <td class="col--comment" width="40">
              <template v-if="hasModuleAccess('comment')">
                <button-icon-sidebar-comment :reference="`clearUp-${field.key}`" :doc="currentProject._id" :title="`${field.question}`" />
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

import DataGeneral from './general';
import DataFrontend from './frontend';
import { mapGetters } from 'vuex';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      clearUpFields: []
    };
  },
  destroyed() {
    Vue.$bus.$emit('updateClearUp', this.type, this.clearUpFields);
  },
  watch: {
    clearUpFields: {
      handler(value) {
        if(this.isLoading === false) {
          setTimeout(() => {
            Vue.$bus.$emit('updateClearUp', this.type, value);
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
    }
  },
  created() {
    this.onMounted();
  },
  methods: {
    onMounted() {
      this.isLoading = true;

      switch(this.type) {
      case 'general':
        this.clearUpFields = DataGeneral();
        break;
      case 'frontend':
        this.clearUpFields = DataFrontend();
        break;
      default:
        this.clearUpFields = [];
        break;
      }

      if(!_.isEmpty(this.clearup[this.type])) {
        for(let i in this.clearup[this.type]) {
          let field = this.clearup[this.type][i];

          let clearUpField = this.clearUpFields.find((x) => {
            return x.key === field.key;
          });

          if(clearUpField) {
            Object.assign(clearUpField.value, field.value);
          }
        }
      }
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
  [colspan="2"] {
    .ui-select, .ui-input--text,textarea {
      min-width:100%;
      max-width:100%;
    }
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
