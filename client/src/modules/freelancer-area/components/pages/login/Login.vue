<template>
  <layout-freelancerarea-out class="page--login">

    <div class="layout-freelancerAreaOut_leftSide"></div>
    <div class="layout-freelancerAreaOut_rightSide">
      <section class="section-container">
        <div class="section-container_head">
          <h1 class="text--shadow">Freelancer Area</h1>
        </div>

        <div class="section-container_body">

          <form @submit.prevent="onSubmit" class="form-login">
            <section class="section-formError" v-if="false">
              <p>Form is not valid</p>
            </section>
            <div class="form-group">
              <ui-input-text name="email" placeholder="Your Email" class="is--fluid" v-model="email" />
            </div>
            <div class="form-group">
              <ui-input-password name="password" placeholder="Your Password" class="is--fluid" v-model="password" />
            </div>
            <div class="form-group text--center">
              <ui-input-submit name="submit" label="Access to Freelancer panel" />
            </div>
            <hr class="fish--hook" />
          </form>

        </div>
      </section>
    </div>
    <div class="clearfix"></div>
  </layout-freelancerarea-out>
</template>

<style lang="sass">
  @import "../../../assets/sass/pages/login.scss";
</style>


<script>
import Vue from 'vue';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async onSubmit() {

      let response = await Vue.$api.post('/login', {
        email: this.email,
        password: this.password
      }).catch(err => {
        this.addNotification(err.response.data.message, 'error');
      });

      if(response.auth) {
        this.$store.dispatch('setToken', response.token);
        window.location.href = '/freelancer-area';
      }


      return false;
    }
  }
};
</script>
