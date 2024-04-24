import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
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
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  switch (true) {
    case to.meta.requiresAuth && !userStore.isAuthenticated:
      return { name: 'authentication-sign-in' };
    case !to.meta.requiresAuth && userStore.isAuthenticated:
      return { name: 'index' };
  }
});

export default router;
