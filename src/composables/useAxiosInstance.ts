import axios from 'axios';
import { useUserStore } from '@/stores/user';
import type { AxiosResponse, AxiosInstance } from 'axios';

let instance: AxiosInstance;
let refresh: Promise<AxiosResponse> | undefined;

export const useAxiosInstance = (): AxiosInstance => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    instance.interceptors.request.use((config) => {
      const tokenName = '_refresh' in config && config._refresh ? 'refresh' : 'access';
      const token = userStore.getToken(tokenName);

      if (token) config.headers.Authorization = token;

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          error.config &&
          // @ts-expect-error
          !error._refresh &&
          // @ts-expect-error
          !error._retry &&
          userStore.getToken('refresh')
        ) {
          // @ts-expect-error
          error.config._retry = true;

          try {
            if (!refresh) {
              refresh = instance('/v1/authentications/refresh', {
                method: 'post',
                // @ts-expect-error
                _refresh: true,
              });

              const { data } = await refresh;
              userStore.updateTokens(data.tokens);
            } else {
              await refresh;
            }

            return await instance(error.config);
          } catch (error) {
            await userStore.signOut(true);
            return Promise.reject(error);
          } finally {
            refresh = undefined;
          }
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  return instance;
};
