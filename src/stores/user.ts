import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';
import router from '@/configurations/router';
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

    try {
      loading.value = true;
      const { data: tokensData } = await api.authentication.sign_in(form);

      updateTokens(tokensData.tokens);

      const { data: userData } = await api.user.info();
      user.value = userData;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (skipRequest = false) => {
    if (loading.value && !skipRequest) return;

    try {
      loading.value = !skipRequest;
      if (!skipRequest) await api.authentication.sign_out();

      updateTokens();
      user.value = undefined;

      await router.push({ name: 'authentication-sign-in' });
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getUserInfo = async () => {
    if (loading.value || !getToken('refresh')) return;

    try {
      loading.value = true;
      const { data } = await api.user.info();

      user.value = data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const loadUserProfile = async () => {
    if (loading.value || !user.value) return;

    try {
      loading.value = true;
      const { data } = await api.user.profile.load();
      user.value.profile = data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    user,
    isAuthenticated,
    updateTokens,
    getToken,
    signIn,
    signOut,
    getUserInfo,
    loadUserProfile,
  };
});
