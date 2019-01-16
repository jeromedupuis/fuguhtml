<template>
  <form @submit.prevent="submitProject">
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/012-chess-piece.svg" /><span>Describe your project</span></h1>
    </section>
    <div class="row">
      <div class="col-12">
        <ui-input-text name="name" placeholder="Project name" class="is--fluid" v-model="name" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <textarea v-model="description" placeholder="Just a few words..."></textarea>
      </div>
    </div>

    <div class="page-createProject_wrapper_submit">
      <ui-input-submit label="Submit your project" :disabled="isDisabled" />
    </div>
  </form>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      name: '',
      description: ''
    };
  },
  computed: {
    newProject() {
      return this.$store.getters.newProject;
    },
    isDisabled() {
      return !this.name;
    }
  },
  mounted() {
    this.setNewProjectInfo();
  },
  methods: {
    setNewProjectInfo() {
      this.$store.dispatch('setNewProjectInfo', {
        name: this.name,
        description: this.description
      });
    },
    submitProject() {
      this.setNewProjectInfo();

      Vue.$api.post('/projects', this.newProject)
        .then((doc) => {
          if(doc) {
            this.addNotification('Project created with success', 'success');
          }
          this.$router.push('/client-area/projects');
        })
        .catch(err => {
          this.addNotification(err.response.data.message, 'error');
        });
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
  textarea {
    display: block;
    margin-bottom: 12px;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 80px;
    min-height: 80px;
    font-size: 14px;
    color: #333;
    -webkit-appearance: none;
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>
