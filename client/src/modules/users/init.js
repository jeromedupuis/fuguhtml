/*
 * spacename : tasks
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.01
 */

import Store from './store/index';
import UsersRoutes from './routes/index.js';
import UsersMixins from './mixins/Users.js';

export default {
  stores: {
    users: Store
  },
  mixins: {
    users: UsersMixins
  },
  routes: [
    ...UsersRoutes
  ]
};
