import Vue from 'vue';
import Vuex from 'vuex';
import notifications from './data/notification.js';

Vue.use(Vuex);

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const state = {
  notices: []
};

const getters = {
  getNotices: state => {
    return state.notices;
  }
};

const actions = {
  addNotification({commit}, notification) {
    commit(ADD_NOTIFICATION, notification);
  },
  deleteNotification({commit}, index) {
    commit(REMOVE_NOTIFICATION, index);
  },
  fetchNotificationbyCode({commit}, params) {
    let code = params.code;
    let args = params.args || [];

    let notification = notifications[code];
    if(!notification) return false;

    let print = notification.print;
    if(!print) return false;

    let text;
    switch(typeof print) {
    case 'string':
      text = print;
      break;
    case 'function':
      text = print.apply(this, args);
      break;
    }
    let type = notification.type || 'default';

    commit(ADD_NOTIFICATION, {
      text,
      type
    });
  }
};

const mutations = {
  [ADD_NOTIFICATION](state, payload) {
    if(typeof payload == 'string' || !payload.type) {
      payload = {
        text: payload,
        type: 'default'
      };
    }
    state.notices = [
      ...state.notices,
      payload
    ];
  },
  [REMOVE_NOTIFICATION](state, payload) {
    state.notices.splice(payload, 1);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
