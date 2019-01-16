/*
 * module name : 顧客エリア
 * spacename : freelancer-area
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.09.29
 */

import Store from './store';

import FreelancerAreaRoutes from './routes.js';
import FreelancerAreaMixins from './mixins/FreelancerArea.js';
import ProjectMixins from './mixins/Project.js';

export default {
  stores: {
    freelancerarea: Store
  },
  mixins: {
    freelancerarea: FreelancerAreaMixins,
    project: ProjectMixins
  },
  routes: FreelancerAreaRoutes
};
