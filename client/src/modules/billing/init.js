/*
 * module name : タスク
 * spacename : tasks
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.01
 */

import Store from './store';
import Lang from './lang';

import BillingRoutes from './routes.js';
import BillingMixins from './mixins/Billing.js';

export default {
  stores: {
    billing: Store
  },
  mixins: {
    billing: BillingMixins
  },
  routes: BillingRoutes,
  lang: Lang
};
