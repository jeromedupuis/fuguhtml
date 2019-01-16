import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

import LangStore from './store/lang';

const SET_WEBSITE_AREA = 'SET_WEBSITE_AREA';

export default new Vuex.Store({
  modules: {
    lang: LangStore,
  },
  state: {
    common: {
      websiteArea: ''
    }
  },
  getters: {
    websiteArea(state) {
      return state.common.websiteArea;
    }
  },
  actions: {
    setWebsiteArea({commit}) {
      let pathname = window.location.pathname
        .substr(1)
        .split('/');

      let area = pathname;
      if(_.isArray(pathname)) {
        area = pathname[0];
      }

      let setArea = '';
      switch(area) {
      case 'client-area':
        setArea = area;
        break;
      case 'freelancer-area':
        setArea = area;
        break;
      case 'admin':
        setArea = area;
        break;
      default:
        setArea = 'website';
        break;
      }
      commit(SET_WEBSITE_AREA, setArea);
    }
  },
  mutations:{
    [SET_WEBSITE_AREA] (state, area) {
      state.common.websiteArea = area;
    }
  }
});
