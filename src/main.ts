import '@/assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/app.vue';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const app = createApp(App).use(createPinia());

const userStore = useUserStore();

userStore.autologin().then(() => {
  app.use(router).mount('#app');
});
