import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { RouteLocationRaw } from 'vue-router';

export const useGlobalStore = defineStore('global', () => {
  const redirectRoute = ref<RouteLocationRaw>();

  return {
    redirectRoute,
  };
});
