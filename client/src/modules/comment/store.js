import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ADD_COMMENT = 'ADD_COMMENT';
const FETCH_COMMENTS = 'FETCH_COMMENTS';

const state = {
  list: []
};
const getters = {}
const actions = {
  fetchComments({ commit }, data) {
    commit(FETCH_COMMENTS, data);
  },
  addComment({commit}, data) {
    commit(ADD_COMMENT, data)
  }
};
const mutations = {
  [FETCH_COMMENTS] (state, data) {
    state.list = data;
  },
  [ADD_COMMENT] (state, data) {
    state.list = [
      data,
      ...state.list
    ];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
