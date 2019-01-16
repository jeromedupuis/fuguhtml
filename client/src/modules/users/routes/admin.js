import PageAdminUsersList from '../components/admin/list/List';
import PageAdminUsersCreate from '../components/admin/create/Create';
import PageAdminUsersEdit from '../components/admin/edit/Edit';

export default [
  {
    path: '/admin/module/users',
    name: 'PageAdminUsersList',
    component: PageAdminUsersList,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/module/users/create',
    name: 'PageAdminUsersCreate',
    component: PageAdminUsersCreate,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/module/users/edit/:id',
    name: 'PageAdminUsersEdit',
    component: PageAdminUsersEdit,
    props: true,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  }
];
