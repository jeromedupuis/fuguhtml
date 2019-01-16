import app from '../main';

const SET_LANG = 'SET_LANG';

const state = {
  locale: 'en'
};
const actions = {
  setLang({commit}, payload) {
    commit(SET_LANG, payload);
  }
};

const mutations = {
  [SET_LANG] (state, payload) {
    app.$i18n.locale = payload;
    state.locale = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
