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
    path: '/companies/:company_id',
    name: 'companies-company-id',
    component: () => import('@/pages/companies/[company_id]/index.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/companies/:company_id/contract/new',
    name: 'companies-company-id-contracts-new',
    component: () => import('@/pages/companies/[company_id]/contracts/new.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
  {
    path: '/companies/:company_id/contract/:contract_id',
    name: 'companies-company-id-contracts-contract-id',
    component: () => import('@/pages/companies/[company_id]/contracts/[contract_id].vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
    },
  },
];
