import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  modules: {
    access: true,
    notification: true,
    clientArea: true,
    tasks: true,
    schedule: true,
    comment: true
  }
};

const getters = {};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
