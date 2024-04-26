import { isAxiosError } from 'axios';
import { useAxiosInstance } from '@/composables/useAxiosInstance';
import type { Api } from '@/types/composables/use-api';

let api: Api;

export const useApi = (): Api => {
  if (!api) {
    const axios = useAxiosInstance();

    api = {
      authentication: {
        sign_in: (data) => axios('/v1/authentications', { method: 'post', data }),
        sign_out: () => axios('/v1/authentications', { method: 'delete' }),
      },
      user: {
        info: () => axios('/v1/user', { method: 'get' }),
        create: (data) => axios('/v1/user', { method: 'post', data }),
      },
      isAxiosError,
    };
  }

  return api;
};
