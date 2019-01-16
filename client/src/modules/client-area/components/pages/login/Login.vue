<template>
  <layout-clientarea-out class="page--login">

    <div class="layout-clientAreaOut_leftSide"></div>
    <div class="layout-clientAreaOut_rightSide">
      <section class="section-container">
        <div class="section-container_head">
          <h1 class="text--shadow">Client Area</h1>
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
              <ui-input-submit name="submit" label="Access to administration" />
            </div>
            <hr class="fish--hook" />
          </form>

        </div>
      </section>
    </div>
    <div class="clearfix"></div>
  </layout-clientarea-out>
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
        window.location.href = '/client-area';
      }


      return false;
    }
  }
};
</script>
