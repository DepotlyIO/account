export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
