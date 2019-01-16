import Vue from 'vue';
import Router from './router/';
import Store from './store';
import _ from 'lodash';

import accessInit from '@/modules/access/init.js';
import notificationInit from '@/modules/notification/init.js';
import uiInit from '@/modules/ui/init.js';
import clientAreaInit from '@/modules/client-area/init.js';
import freelancerAreaInit from '@/modules/freelancer-area/init.js';
import tasksInit from '@/modules/tasks/init.js';
import scheduleInit from '@/modules/schedule/init.js';
import billingInit from '@/modules/billing/init.js';
import commentInit from '@/modules/comment/init.js';
import projectsInit from '@/modules/projects/init.js';
import adminInit from '@/modules/admin/init.js';
import usersInit from '@/modules/users/init.js';

let modules = [
  accessInit,
  notificationInit,
  uiInit,
  clientAreaInit,
  freelancerAreaInit,
  tasksInit,
  scheduleInit,
  billingInit,
  commentInit,
  projectsInit,
  adminInit,
  usersInit
];

Vue.$service = {
  lang: {},
  projects: {},
  access: {}
};
Vue.$module = {
  ui: true,
  access: true,
  notification: true,
  clientAreaInit: true,
  freelancerAreaInit: true,
  tasks: true,
  billing: true,
  comment: true,
  projects: true,
  admin: true,
  users: true
};

modules.map((module) => {
  if(!module) return;

  let key;
  if('mixins' in module) {
    for(key in module.mixins) {
      let mixin = module.mixins[key];
      Vue.mixin(mixin);
    }
  }

  if('services' in module) {
    for(key in module.services) {
      let service = module.services[key];
      Vue.$service[key] = service;
    }
  }

  if('routes' in module) {
    Router.addRoutes(module.routes);
  }
  if('stores' in module) {
    for(key in module.stores) {
      let store = module.stores[key];
      Store.registerModule(key, store);
    }
  }
  if('lang' in module) {
    for(key in module.lang) {
      if(_.isEmpty(Vue.$service.lang[key])) {
        Vue.$service.lang[key] = {};
      }
      Object.assign(Vue.$service.lang[key], module.lang[key]);
    }
  }
});
