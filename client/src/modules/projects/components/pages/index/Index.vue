<template>
  <layout-area classname="page--index" suffix="nosidebar">
    <slot-header-title title="Project List" />

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else>
      <div class="clientArea-project_list">
        <div class="clientArea-project_listCreate" v-if="websiteArea == 'client-area'">
          <router-link :to="`/${websiteArea}/projects/create`">
            <img src="/static/img/svg/036-add.svg" />
            <p>Create a new project</p>
          </router-link>
        </div>
        <div class="clientArea-project_listItem" v-for="(project, index) in projects" :key="index">
          <router-link :to="`/${websiteArea}/projects/${project._id}`">
            <div>

              <p>{{ project.name || 'undefined' }}</p>
              <hr class="fish--hook" />
              <p><small>{{ project.category }}</small> / <small>{{ project.status }}</small></p>
            </div>
          </router-link>
        </div>
      </div>
    </template>

  </layout-area>
</template>

<style lang="scss" scoped>
  @import "../../../assets/sass/pages/index.scss";
  .clientArea-project_listItem, .clientArea-project_listCreate {
    overflow: hidden;
    vertical-align: top;
    display: inline-block;
    margin: 12px;
    text-align: center;
    border-radius: 12px;
    border: 1px solid #efefef;
    font-size: 12px;
    width: 200px;
    height: 200px;
    text-align: center;
    padding:24px;
    a {
      display: block;
      height: 100%;
      padding: 12px;
    }
    p {
      text-align: center;
    }
    .fish--hook, img {
      display: block;
      width: 30px;
      height: 30px;
      margin: 20px auto;
    }
    img {
      margin-top:30px;
    }
  }
</style>

<script>

export default {
  data() {
    return {
      isPageLoading: false
    };
  },
  async created() {
    this.isPageLoading = true;

    if(this.websiteArea == 'client-area') {
      await this.$store.dispatch('fetchProjectsByOwnerId', {
        ownerId: this.me._id
      });
    } else {
      await this.$store.dispatch('fetchProjectsByAssigneeId', {
        assigneeId: this.me._id
      });
    }
    this.isPageLoading = false;
  },
  computed: {
    projects() {
      let projects = [];
      if(this.websiteArea == 'client-area') {
        projects = this.$store.getters.ownedProjects;
      }
      if(this.websiteArea == 'freelancer-area') {
        projects = this.$store.getters.assignedProjects;
      }
      projects.reverse();
      return projects;
    }
  }
};
</script>
