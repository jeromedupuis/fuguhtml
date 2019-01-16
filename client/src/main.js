import 'babel-polyfill';
import '../.modernizrrc.js';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import VueScrollTo from 'vue-scrollto';
import { EventBus } from './event-bus';

import './mixins';
import './modules';

import App from './App';
import router from './router';
import store from './store';
import i18n from './lang';
import libs from './libs';
import api from './api';

Vue.$api = api;
Vue.config.productionTip = false;
Vue.$bus = EventBus;
Vue.$store = store;
Vue.$libs = libs;

Vue.use(VueScrollTo);

Vue.use(VueProgressBar, {
  color: '#04538e',
  failedColor: '#ff3d55',
  height: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 800
  }
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
});
