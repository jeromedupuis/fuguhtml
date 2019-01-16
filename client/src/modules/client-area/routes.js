import PageClientAreaIndex from './components/pages/index/Index';
import PageClientAreaLogin from './components/pages/login/Login';

export default [
  {
    path: '/client-area/login',
    name: 'PageClientAreaLogin',
    component: PageClientAreaLogin,
    meta: {
      guest: true
    }
  },
  {
    path: '/client-area',
    name: 'PageClientArea',
    component: PageClientAreaIndex,
    meta: {
      requiresAuth: true,
      isClient: true
    }
  }
];
