import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);

const SET_ME = 'SET_ME';
const SET_TOKEN = 'SET_TOKEN';

const state = () => {
  return {
    me: {},
    token: null
  };
};

const getters = {
  getMe: state => {
    return state.me;
  },
  getToken: state => {
    return state.token;
  },
  isClient: (state, getters) => {
    let me = getters.getMe;
    return _.get(me, 'isClient', false);
  },
  isFreelancer: (state, getters) => {
    let me = getters.getMe;
    return _.get(me, 'isFreelancer', false);
  }
};
const actions = {
  setToken({commit}, token) {
    localStorage.setItem('jwt', token);
    commit(SET_TOKEN, token);
  },
  setMe({commit}, data) {
    commit(SET_ME, data);
  },
  logout({commit}) {
    localStorage.removeItem('jwt');
    commit(SET_ME, {});
    commit(SET_TOKEN, null);
  }
};
const mutations = {
  [SET_ME] (state, payload) {
    state.me = payload;
  },
  [SET_TOKEN] (state, payload) {
    state.token = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
