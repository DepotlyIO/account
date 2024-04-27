export default [
  {
    path: '/charts',
    name: 'charts',
    component: () => import('@/pages/charts/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
