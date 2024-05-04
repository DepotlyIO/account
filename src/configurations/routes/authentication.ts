export default [
  {
    path: '/authentication',
    redirect: { name: 'authentication-sign-in' },
    meta: {
      isAuthentication: true,
    },
  },
  {
    path: '/authentication/verify',
    name: 'authentication-verify',
    component: () => import('@/pages/authentication/verify.vue'),
    meta: {
      isAuthentication: true,
      layout: 'authentication',
    },
  },
  {
    path: '/authentication/reset',
    name: 'authentication-reset',
    component: () => import('@/pages/authentication/reset.vue'),
    meta: {
      isAuthentication: true,
      layout: 'authentication',
    },
  },
  {
    path: '/authentication/sign-in',
    name: 'authentication-sign-in',
    component: () => import('@/pages/authentication/sign-in.vue'),
    meta: {
      isAuthentication: true,
      layout: 'authentication',
    },
  },
  {
    path: '/authentication/sign-up',
    name: 'authentication-sign-up',
    component: () => import('@/pages/authentication/sign-up.vue'),
    meta: {
      isAuthentication: true,
      layout: 'authentication',
    },
  },
];
