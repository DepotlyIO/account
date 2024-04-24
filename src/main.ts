import '@/assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/app.vue';
import router from '@/configurations/router';
import i18n from '@/configurations/i18n';
import { useUserStore } from '@/stores/user';

const app = createApp(App).use(createPinia());

const userStore = useUserStore();

userStore.autologin().then(() => {
  app.use(router).use(i18n).mount('#app');
});
