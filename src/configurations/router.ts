import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

import authentication from '@/configurations/routes/authentication';

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

    ...authentication,
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
