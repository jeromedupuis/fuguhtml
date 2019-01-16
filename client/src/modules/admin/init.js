/*
 * module name : 管理パネル
 * spacename : client-area
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.16
 */

import Store from './store';

import AdminRoutes from './routes.js';
import AdminMixins from './mixins/Admin.js';

export default {
  stores: {
    admin: Store
  },
  mixins: {
    admin: AdminMixins
  },
  routes: AdminRoutes
};
