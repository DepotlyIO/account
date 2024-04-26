import '@/assets/styles/main.scss';

import { createApp } from 'vue';

import App from '@/app.vue';

import pinia from '@/configurations/pinia';
import router from '@/configurations/router';
import i18n from '@/configurations/i18n';
import unhead from '@/configurations/unhead';

import { useUserStore } from '@/stores/user';

const app = createApp(App).use(pinia);

const userStore = useUserStore();

userStore.getUserInfo().then(() => {
  app.use(router).use(i18n).use(unhead).mount('#app');
});
