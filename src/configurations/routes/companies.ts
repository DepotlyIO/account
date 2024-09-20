export default [
  {
    path: '/companies',
    name: 'companies',
    component: () => import('@/pages/companies/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/companies/create',
    name: 'companies-create',
    component: () => import('@/pages/companies/create.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/companies/:id',
    name: 'companies-id',
    component: () => import('@/pages/companies/[id].vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
