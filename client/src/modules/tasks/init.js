/*
 * module name : タスク
 * spacename : tasks
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.01
 */

import Store from './store';

import TasksRoutes from './routes/index.js';
import TasksRoutesAdmin from './routes/admin.js';
import TasksMixins from './mixins/Tasks.js';

export default {
  stores: {
    tasks: Store
  },
  mixins: {
    tasks: TasksMixins
  },
  routes: [
    ...TasksRoutes,
    ...TasksRoutesAdmin
  ]
};
