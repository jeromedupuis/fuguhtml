import PageFreelancerAreaIndex from './components/pages/index/Index';
import PageFreelancerAreaLogin from './components/pages/login/Login';

export default [
  {
    path: '/freelancer-area/login',
    name: 'PageFreelancerAreaLogin',
    component: PageFreelancerAreaLogin,
    meta: {
      guest: true
    }
  },
  {
    path: '/freelancer-area',
    name: 'PageFreelancerArea',
    component: PageFreelancerAreaIndex,
    meta: {
      requiresAuth: true,
      isFreelancer: true
    }
  }
];
