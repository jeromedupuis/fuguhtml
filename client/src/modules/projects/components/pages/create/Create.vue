<template>
  <layout-area classname="page--createProject" suffix="nosidebar">
    <slot-header-title title="Create a new project" :back="true" />

    <div class="page-createProject_wrapper">
      <template v-if="getCategoryComponent && !getStepComponent">
        <component :is="getCategoryComponent"></component>
      </template>
      <template v-else-if="getStepComponent">
        <component :is="getStepComponent"></component>
        <div class="page-createProject_wrapper_submit" v-if="step < totalStep">
          <ui-input-submit @click="nextStep" label="Next step" />
        </div>
      </template>
    </div>
    <create-project-flow />
  </layout-area>
</template>

<style lang="sass">
  @import "../../../assets/sass/pages/create.scss";
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';
import CreateProjectStepAboutYou from './StepAboutYou';
import CreateProjectStepAboutCompany from './StepAboutCompany';
import CreateProjectStepPagesTemplates from './StepPagesTemplates';
import CreateProjectStepCategory from './StepCategory';
import CreateProjectStepSelectFreelancer from './StepSelectFreelancer';
import CreateProjectStepCategoryFrontEnd from './frontend/StepCategory';
import CreateProjectStepSubmit from './StepSubmit';
import CreateProjectFlow from './Flow';
export default {
  components: {
    'create-project-step-category': CreateProjectStepCategory,
    'create-project-step-category-frontend': CreateProjectStepCategoryFrontEnd,
    'create-project-step-about-you': CreateProjectStepAboutYou,
    'create-project-step-about-company': CreateProjectStepAboutCompany,
    'create-project-step-pages-templates': CreateProjectStepPagesTemplates,
    'create-project-step-select-freelancer': CreateProjectStepSelectFreelancer,
    'create-project-flow': CreateProjectFlow,
    'create-project-step-submit': CreateProjectStepSubmit
  },
  props: {
    category: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    hasSubcategory() {
      let step = this.stepFlow[this.category];
      return _.isObject(step) && !_.isEmpty(step);
    },
    getCategoryComponent() {
      let prefix = 'create-project-step-';
      if(!this.category) {
        return prefix+'category';
      }
      return prefix+'category-'+this.category;
    },
    getStepComponent() {
      if(!this.category) {
        return null;
      }

      let prefix = 'create-project-step-';
      let stepFlow = this.stepFlow[this.category];
      if(!stepFlow) {
        return null;
      }
      stepFlow = stepFlow[this.step];

      if(!stepFlow) {
        return null;
      }
      return prefix+stepFlow;
    },
    totalStep() {
      if(!this.category) {
        return 0;
      }

      let stepFlow = this.stepFlow[this.category];
      if(_.isArray(stepFlow)) {
        return stepFlow.length-1;
      }
      return 0;
    },
    newProject() {
      return this.$store.getters.newProject;
    },
    stepFlow() {
      if(this.websiteArea == 'client-area' || this.websiteArea == 'freelancer-area') {
        return this.stepFlowIn;
      }
      return this.stepFlowOut;
    }
  },
  data() {
    return {
      step: 0,
      stepFlowOut: {
        frontend: ['pages-templates', 'about-you', 'about-company', 'select-freelancer', 'submit'],
        uiux: ['pages-templates', 'about-you', 'about-company', 'select-freelancer', 'submit'],
        photography: ['about-you', 'about-company', 'select-freelancer', 'submit']
      },
      stepFlowIn: {
        frontend: ['pages-templates', 'select-freelancer', 'submit'],
        uiux: ['pages-templates', 'select-freelancer', 'submit'],
        photography: ['select-freelancer', 'submit']
      }
    };
  },
  mounted() {
    this.initNewProject();
    Vue.$bus.$on('createProjectNextStep', () => {
      this.nextStep();
    });
  },
  updated() {
    this.initNewProject();
  },
  destroyed() {
    Vue.$bus.$off('createProjectNextStep');
  },
  methods: {
    initNewProject() {
      this.$store.dispatch('initNewProject', {
        category: this.category,
        ownerId: this.me._id.toString()
      });
    },
    nextStep() {
      if(this.step < this.totalStep) {
        this.step += 1;
      }
    }
  }
};
</script>
