import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';
import type { User } from '@/types/models/user';
import type { Tokens, AuthenticationRequest } from '@/types/models/authentication';

export const useUserStore = defineStore('user', () => {
  const api = useApi();

  const loading = ref(false);
  const user = ref<User>();

  const isAuthenticated = computed(() => !!user.value);

  const updateTokens = (tokens: Tokens = { access: '', refresh: '' }) => {
    const { access, refresh } = tokens;

    if (access && refresh) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
    } else {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  };

  const getToken = (name: 'access' | 'refresh'): string | null => localStorage.getItem(name);

  const signIn = async (form: AuthenticationRequest) => {
    if (loading.value) return;

    loading.value = true;
    try {
      const { data } = await api.authentication.sign_in(form);

      user.value = data.user;
      updateTokens(data.tokens);
    } catch (e) {
      console.error(e);
    }
    loading.value = false;
  };

  const signOut = async () => {
    if (loading.value) return;

    loading.value = true;
    try {
      await api.authentication.sign_out();

      user.value = undefined;
      updateTokens();
    } catch (e) {
      console.error(e);
    }
    loading.value = false;
  };

  const autologin = async () => {
    if (loading.value || !getToken('refresh')) return;

    loading.value = true;
    try {
      const { data } = await api.authentication.autologin();

      user.value = data;
    } catch (e) {
      console.error(e);
    }
    loading.value = false;
  };

  return {
    loading,
    user,
    isAuthenticated,
    updateTokens,
    getToken,
    signIn,
    signOut,
    autologin,
  };
});
