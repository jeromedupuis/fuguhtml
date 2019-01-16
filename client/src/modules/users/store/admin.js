import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);

const FETCH_USERS = 'FETCH_USERS';
const FETCH_ONE_USER = 'FETCH_ONE_USER';
const UNSET_USER = 'UNSET_USER';
const ADD_USER = 'ADD_USER';

const state = () => {
  return {
    users: []
  };
};

const getters = {
  adminUser: state => {
    return user_id => {
      return state.users.find((doc) => {
        return doc.id == user_id;
      });
    };
  },
  adminUsers: state => {
    return state.users;
  }
};
const actions = {
  async adminFetchUsers({commit}) {
    let docs = await Vue.$api.get('/users');
    commit(FETCH_USERS, docs);
  },
  adminRemoveUser({commit}, id) {
    commit(UNSET_USER, id);
  },
  adminAddUser({commit}, doc) {
    commit(ADD_USER, doc);
  }
};
const mutations = {
  [FETCH_USERS] (state, payload) {
    state.users = payload;
  },
  [FETCH_ONE_USER] (state, payload) {
    let index = _.findIndex(state.users, (doc) => {
      return doc._id === payload._id;
    });

    if(index == -1) {
      state.users.push(payload);
    } else {
      Object.assign(state.users[index], payload);
    }
  },
  [UNSET_USER] (state, payload) {
    let index = _.findIndex(state.users, (doc) => {
      return doc._id === payload;
    });
    if(index > -1) {
      state.users.splice(index, 1);
    }
  },
  [ADD_USER] (state, payload) {
    state.users = [
      payload,
      ...state.users
    ];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
