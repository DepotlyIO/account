export default [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/account/edit/profile',
    name: 'account-edit-profile',
    component: () => import('@/pages/account/edit/profile.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
