import axios from 'axios';
import { useUserStore } from '@/stores/user';
import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import type { AuthenticationResponse } from '@/types/models/authentication';

let instance: AxiosInstance;

interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _refresh?: boolean;
}

interface ExtendedAxiosError extends AxiosError {
  _retry?: boolean;
  _refresh?: boolean;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _refresh?: boolean;
}

export const useAxiosInstance = (): AxiosInstance => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    instance.interceptors.request.use((config: ExtendedInternalAxiosRequestConfig) => {
      const access_token = userStore.getToken('access');

      if (access_token && !config._refresh) {
        config.headers['Authorization'] = access_token;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error: ExtendedAxiosError) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          !error._refresh &&
          !error._retry &&
          userStore.getToken('refresh')
        ) {
          const { data } = await instance<AuthenticationResponse>('/v1/authentications/refresh', {
            method: 'post',
            headers: {
              Authorization: userStore.getToken('refresh'),
            },
            _refresh: true,
          } as ExtendedAxiosRequestConfig);

          userStore.user = data.user;
          userStore.updateTokens(data.tokens);

          return await instance({
            ...error.request,
            _retry: true,
          });
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  return instance;
};
