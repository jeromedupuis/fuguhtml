<template>
  <form>
    <section class="project-create_formTitle">
      <h1><img src="/static/img/svg/012-chess-piece.svg" /><span>About you</span></h1>
    </section>
    <div class="row">
      <div class="col-6">
        <ui-input-text name="firstname" placeholder="Your first name" class="is--fluid" v-model="firstname" />
      </div>
      <div class="col-6">
        <ui-input-text name="lastname" placeholder="Your last name" class="is--fluid" v-model="lastname" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <ui-input-text name="email" placeholder="Your email" class="is--fluid" v-model="email" />
      </div>
      <div class="col-6">
        <ui-input-text name="tel" placeholder="Your phone number" class="is--fluid" v-model="tel" />
      </div>
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      tel: ''
    };
  },
  mounted() {
    this.setNewProjectInfo();
  },
  destroyed() {
    this.setNewProjectInfo();
  },
  methods: {
    setNewProjectInfo() {
      this.$store.dispatch('setNewProjectInfo', {
        aboutyou: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          tel: this.tel
        }
      });
    }
  }
};
</script>
