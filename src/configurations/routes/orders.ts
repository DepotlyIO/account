export default [
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/pages/orders/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
