import PageAdminTaskList from '../components/admin/List';

export default [
  {
    path: '/admin/module/tasks',
    name: 'PageAdminTaskList',
    component: PageAdminTaskList,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    }
  },
];
