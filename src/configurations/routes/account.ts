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
];
