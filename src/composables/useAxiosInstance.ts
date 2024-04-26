import axios from 'axios';
import { useUserStore } from '@/stores/user';
import type { AxiosInstance } from 'axios';

let instance: AxiosInstance;

export const useAxiosInstance = (): AxiosInstance => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.DEV ? undefined : import.meta.env.VITE_BASE_API_URL,
    });

    instance.interceptors.request.use((config) => {
      const token = userStore.getToken(
        '_refresh' in config && config._refresh ? 'refresh' : 'access',
      );

      if (token) config.headers.Authorization = token;

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          axios.isAxiosError(error) &&
          error.config &&
          error.response &&
          error.response.status === 401 &&
          // @ts-expect-error
          !error._refresh &&
          // @ts-expect-error
          !error._retry &&
          userStore.getToken('refresh')
        ) {
          // @ts-expect-error
          error.config._retry = true;

          try {
            const { data } = await instance('/v1/authentications/refresh', {
              method: 'post',
              // @ts-expect-error
              _refresh: true,
            });

            userStore.updateTokens(data.tokens);

            return await instance(error.config);
          } catch (e) {
            await userStore.signOut(true);
          }
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  return instance;
};
