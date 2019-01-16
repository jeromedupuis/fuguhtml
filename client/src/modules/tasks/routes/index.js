import Vue from 'vue';
import PageTasksList from '../components/pages/List';
import PageTaskDetail from '../components/pages/Detail';

export default [
  {
    path: '/freelancer-area/projects/:projectId/tasks',
    name: 'PageTasksList',
    component: PageTasksList,
    props: true,
    meta: {
      requiresAuth: true,
      isFreelancer: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  },
  {
    path: '/freelancer-area/projects/:projectId/tasks/:id',
    name: 'PageTaskDetail',
    component: PageTaskDetail,
    props: true,
    meta: {
      requiresAuth: true,
      isFreelancer: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  },
  {
    path: '/client-area/projects/:projectId/tasks',
    name: 'PageTasksList',
    component: PageTasksList,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  },
  {
    path: '/client-area/projects/:projectId/tasks/:id',
    name: 'PageTaskDetail',
    component: PageTaskDetail,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  },
];
