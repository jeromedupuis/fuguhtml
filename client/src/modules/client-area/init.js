/*
 * module name : 顧客エリア
 * spacename : client-area
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.09.29
 */

import Store from './store';

import ClientAreaRoutes from './routes.js';
import ClientAreaMixins from './mixins/ClientArea.js';
import ProjectMixins from './mixins/Project.js';

export default {
  stores: {
    clientarea: Store
  },
  mixins: {
    clientarea: ClientAreaMixins,
    project: ProjectMixins
  },
  routes: ClientAreaRoutes
};
