/*
 * module name : タスク
 * spacename : tasks
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.01
 */

import Store from './store';

import ScheduleRoutes from './routes.js';
import ScheduleMixins from './mixins/Schedule.js';

export default {
  stores: {
    schedule: Store
  },
  mixins: {
    schedule: ScheduleMixins
  },
  routes: ScheduleRoutes
};
