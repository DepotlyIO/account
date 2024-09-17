import { createRouter, createWebHistory } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';

import main from '@/configurations/routes/main';
import account from '@/configurations/routes/account';
import authentication from '@/configurations/routes/authentication';
import orders from '@/configurations/routes/orders';
import wallets from '@/configurations/routes/wallets';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...main, ...account, ...authentication, ...orders, ...wallets],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  switch (true) {
    case to.meta.requiresAuth && !userStore.isAuthenticated: {
      const globalStore = useGlobalStore();
      globalStore.redirectRoute = to;

      return { name: 'authentication-sign-in' };
    }
    case !to.meta.requiresAuth && userStore.isAuthenticated: {
      return { name: 'index' };
    }
  }
});

export default router;
