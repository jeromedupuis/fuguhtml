import PageAdminLogin from './components/pages/login/Login';
import PageAdminIndex from './components/pages/index/Index';

export default [
  {
    path: '/admin/login',
    name: 'PageAdminLogin',
    component: PageAdminLogin,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'PageAdmin',
    component: PageAdminIndex,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  }
];
