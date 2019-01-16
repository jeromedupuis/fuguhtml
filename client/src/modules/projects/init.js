/*
 * module name : プロジェクト
 * spacename : projects
 * version : 1.0.1
 * author: Jerome Dupuis
 * last updated : 2018.10.8
 */

import Store from './store';

import ProjectsServices from './services/projects';
import ProjectsRoutes from './routes.js';
import ProjectsMixins from './mixins/Projects.js';

export default {
  stores: {
    projects: Store
  },
  routes: ProjectsRoutes,
  mixins: {
    projects: ProjectsMixins
  },
  services: {
    projects: ProjectsServices
  }
};
