<template>
  <layout-area classname="page--projectClearup">
    <slot-header-title title="Clear up details" :icon="null" />

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else>

      <section class="page--projectClearupRow" :style="{zIndex:10}" v-if="type == 'details'">
        <schema-form type="general" title="Common" />
      </section>
      <section class="page--projectClearupRow" :style="{zIndex:9}" v-else-if="type == 'frontend'">
        <schema-form type="frontend" title="Front end" />
      </section>
      <section class="page--projectClearupRow" :style="{zIndex:8}" v-else-if="type == 'tasks'">
        <clearup-tasks />
      </section>
<!-- 
      <section class="page--projectClearupRow row--comment">
        <div class="ui-page-title">
          <h2>Clear up details's comments</h2>
        </div>
        <page-comment :reference="`clearUp-${type}`" :doc="currentProject._id" />
      </section> -->
    </template>
  </layout-area>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import SchemaForm from './schema/Form';
import ClearupTasks from './tasks/Tasks';

export default {
  components: {
    SchemaForm,
    ClearupTasks
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPageLoading: false,
      lastUpdated: false,
      timeoutClearUp: false,
      isNestedRequest: false,
    };
  },
  created() {
    this.onMounted();
  },
  watch: {
    type(value, oldValue) {
      if(oldValue) {
        this.isPageLoading = true;
        this.$nextTick(() => {
          this.isPageLoading = false;
        });
      }
    },
    'currentProject.clearup'(value, beforeValue) {

      let refreshTime = 2000;
      let now = Math.floor(Date.now());

      if(this.lastUpdated && now - this.lastUpdated < refreshTime) {

        if(this.timeoutClearUp) {
          clearTimeout(this.timeoutClearUp);
        }
        this.timeoutClearUp = setTimeout(() => {
          this.saveClearup(value, beforeValue);
        }, (now-this.lastUpdated+100));

        return false;
      }

      if(this.timeoutClearUp) {
        clearTimeout(this.timeoutClearUp);
      }
      this.saveClearup(value, beforeValue);
    }
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'isClient',
      'isFreelancer'
    ])
  },
  methods: {
    onMounted() {
      this.isPageLoading = true;
      if(this.currentProject.status !== 'CLEARUP') {
        this.$router.push('/client-area/projects');
        return false;
      }

      Vue.$bus.$on('updateClearUp', async (key, fields) => {
        let body = {};
        body[key] = {};

        for(var i in fields) {
          let field = fields[i];
          body[key][i] = {
            key: field.key,
            label: field.label,
            value: field.value
          };
        }

        this.currentProject.clearup = {
          ...this.currentProject.clearup,
          ...body
        };

      });
      this.isPageLoading = false;
    },
    saveClearup(values) {

      let fields = this.getNestedValues(values, 'clearup');
      if(_.isEmpty(fields)) {
        return false;
      }
      this.lastUpdated = Math.floor(Date.now());
      Vue.$api.put('/projects/'+this.currentProject._id, {
        'clearup.validation.client': false,
        'clearup.validation.freelancer': false,
        ...fields
      });
    },
    getNestedValues(obj, nestedKey) {
      let body = {};
      if(_.isEmpty(obj)) {
        return body;
      }
      if(!_.isObject(obj)) {
        return body;
      }

      for(let key in obj) {
        let value = {};
        if (obj.hasOwnProperty(key)) {

          let v = obj[key];
          if(v && v.key !== undefined) {
            let path = key;
            if(nestedKey) {
              path = `${nestedKey}.${key}`;
            }

            if(v.value) {
              value[`${path}.key`] = v.key;
              value[`${path}.label`] = v.label;

              if(this.isClient && v.value.client !== undefined) {
                value[`${path}.value.client`] = v.value.client;
              }
              else if(this.isFreelancer && v.value.freelancer !== undefined) {
                value[`${path}.value.freelancer`] = v.value.freelancer;
              }
            }
          }
          else if(v) {
            let path = key;
            if(nestedKey) {
              path = `${nestedKey}.${key}`;
            }

            value = this.getNestedValues(v, path);
          }

          if(!_.isEmpty(value)) {
            body = {
              ...body,
              ...value
            };
          }
        }
      }
      return body;
    }
  }
};
</script>

<style lang="scss" scoped>
  .page--projectClearupRow {
    margin:-24px;
    padding:24px;
    position: relative;
    padding-bottom:40px;

    &:nth-child(odd) {
      background: #f8f8f8;
    }
    &.row--comment {
      padding:62px;
      background: transparent;
    }
  }
</style>
