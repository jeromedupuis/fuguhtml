import Vue from 'vue';
import PageSchedule from './components/pages/Schedule';

export default [
  {
    path: '/client-area/projects/:projectId/schedule',
    name: 'PageSchedule',
    component: PageSchedule,
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
    path: '/freelancer-area/projects/:projectId/schedule',
    name: 'PageSchedule',
    component: PageSchedule,
    props: true,
    meta: {
      requiresAuth: true,
      isFreelancer: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  }
];
