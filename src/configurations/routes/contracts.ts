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
  {
    path: '/contracts/:id',
    name: 'contracts-id',
    component: () => import('@/pages/contracts/[id]/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/contracts/:id/edit',
    name: 'contracts-id-edit',
    component: () => import('@/pages/contracts/[id]/edit.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/contracts/create',
    name: 'contracts-create',
    component: () => import('@/pages/contracts/create.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/contracts/create',
    name: 'contracts-create',
    component: () => import('@/pages/contracts/create.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
