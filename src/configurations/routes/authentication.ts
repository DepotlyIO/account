export default [
  {
    path: '/authentication',
    component: () => import('@/pages/authentication/index.vue'),
    redirect: { name: 'authentication-sign-in' },
    meta: {
      isAuthentication: true,
    },
    children: [
      {
        path: 'confirm',
        name: 'authentication-confirm',
        component: () => import('@/pages/authentication/confirm.vue'),
      },
      {
        path: 'reset',
        name: 'authentication-reset',
        component: () => import('@/pages/authentication/reset.vue'),
      },
      {
        path: 'sign-in',
        name: 'authentication-sign-in',
        component: () => import('@/pages/authentication/sign-in.vue'),
      },
      {
        path: 'sign-up',
        name: 'authentication-sign-up',
        component: () => import('@/pages/authentication/sign-up.vue'),
      },
    ],
  },
];
