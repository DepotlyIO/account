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
  {
    path: '/orders/create',
    name: 'orders-create',
    component: () => import('@/pages/orders/create.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/orders/:id',
    name: 'orders-id',
    component: () => import('@/pages/orders/[id].vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
