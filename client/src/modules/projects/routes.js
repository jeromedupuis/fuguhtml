import PageProjectsIndex from './components/pages/index/Index';
import PageProjectCreate from './components/pages/create/Create';
import PageProjectResume from './components/pages/resume/Index';
import PageProjectClearup from './components/pages/clearup/Clearup';
import PageProjectReview from './components/pages/review/Review';
import PageProjectDownload from './components/pages/download/Download';
import PageProjectSettings from './components/pages/settings/Settings';
import Vue from 'vue';

export default [
  /*
   * Freelancer-area router
   */
  {
    path: '/freelancer-area/projects',
    name: 'PageProjectsIndex',
    component: PageProjectsIndex,
    props: true,
    meta: {
      requiresAuth: true,
      isFreelancer: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterProjects(to, from, next);
      }
    }
  },
  {
    path: '/freelancer-area/projects/:projectId',
    name: 'PageProjectIndex',
    component: PageProjectResume,
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
    path: '/freelancer-area/projects/:projectId/resume',
    name: 'PageProjectResume',
    component: PageProjectResume,
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
    path: '/freelancer-area/projects/:projectId/clearup/:type',
    name: 'PageProjectClearup',
    component: PageProjectClearup,
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
    path: '/freelancer-area/projects/:projectId/review',
    name: 'PageProjectReview',
    component: PageProjectReview,
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
    path: '/freelancer-area/projects/:projectId/download',
    name: 'PageProjectDownload',
    component: PageProjectDownload,
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
    path: '/freelancer-area/projects/:projectId/settings',
    name: 'PageProjectSettings',
    component: PageProjectSettings,
    props: true,
    meta: {
      requiresAuth: true,
      isFreelancer: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  },

  /*
   * Client-area router
   */
  {
    path: '/client-area/projects/create',
    name: 'PageProjectCreate',
    component: PageProjectCreate,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
    }
  },
  {
    path: '/client-area/projects',
    name: 'PageProjectsIndex',
    component: PageProjectsIndex,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterProjects(to, from, next);
      }
    }
  },
  {
    path: '/client-area/projects/create/:category/:subcategory',
    name: 'PageProjectCreateSubCategory',
    component: PageProjectCreate,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true
    }
  },
  {
    path: '/client-area/projects/create/:category',
    name: 'PageProjectCreateCategory',
    component: PageProjectCreate,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
    }
  },
  {
    path: '/client-area/projects/create/id/:projectId',
    name: 'PageProjectCreateEdit',
    component: PageProjectCreate,
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
    path: '/client-area/projects/:projectId',
    name: 'PageProjectIndex',
    component: PageProjectResume,
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
    path: '/client-area/projects/:projectId/resume',
    name: 'PageProjectResume',
    component: PageProjectResume,
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
    path: '/client-area/projects/:projectId/clearup/:type',
    name: 'PageProjectClearup',
    component: PageProjectClearup,
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
    path: '/client-area/projects/:projectId/review',
    name: 'PageProjectReview',
    component: PageProjectReview,
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
    path: '/client-area/projects/:projectId/download',
    name: 'PageProjectDownload',
    component: PageProjectDownload,
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
    path: '/client-area/projects/:projectId/settings',
    name: 'PageProjectSettings',
    component: PageProjectSettings,
    props: true,
    meta: {
      requiresAuth: true,
      isClient: true,
      beforeEnter: async (to, from, next) => {
        await Vue.$service.projects.beforeEnterOneProject(to, from, next);
      }
    }
  }
];
