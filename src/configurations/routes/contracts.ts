export default [
  {
    path: '/contracts',
    name: 'contracts',
    component: () => import('@/pages/contracts/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
