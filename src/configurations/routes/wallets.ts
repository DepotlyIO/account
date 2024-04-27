export default [
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import('@/pages/wallets/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
