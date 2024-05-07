export default [
  {
    path: '/authentication',
    redirect: { name: 'authentication-sign-in' },
    meta: {
      isAuthentication: true,
    },
  },
  {
    path: '/authentication/reset',
    name: 'authentication-reset',
    component: () => import('@/pages/authentication/reset.vue'),
    meta: {
      layout: 'authentication',
      isAuthentication: true,
    },
  },
  {
    path: '/authentication/sign-in',
    name: 'authentication-sign-in',
    component: () => import('@/pages/authentication/sign-in.vue'),
    meta: {
      layout: 'authentication',
      isAuthentication: true,
    },
  },
  {
    path: '/authentication/sign-up',
    name: 'authentication-sign-up',
    component: () => import('@/pages/authentication/sign-up.vue'),
    meta: {
      layout: 'authentication',
      isAuthentication: true,
    },
  },
];
