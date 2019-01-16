import Vue from 'vue';
import PageBilling from './components/pages/Billing';
import PageInvoice from './components/pages/Invoice';

export default [
  {
    path: '/freelancer-area/projects/:projectId/billing',
    name: 'PageBilling',
    component: PageBilling,
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
    path: '/freelancer-area/projects/:projectId/billing/invoice/:id',
    name: 'PageInvoice',
    component: PageInvoice,
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
    path: '/client-area/projects/:projectId/billing',
    name: 'PageBilling',
    component: PageBilling,
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
    path: '/client-area/projects/:projectId/billing/invoice/:id',
    name: 'PageInvoice',
    component: PageInvoice,
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
