export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/verify',
    name: 'confirm',
    component: () => import('@/pages/verify.vue'),
    meta: {
      layout: 'authentication',
      requiresAuth: true,
    },
  },
];
