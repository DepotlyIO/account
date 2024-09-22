import { isAxiosError } from 'axios';
import { useAxiosInstance } from '@/composables/useAxiosInstance';
import type { Api } from '@/types/composables/use-api';

let api: Api;

export const useApi = (): Api => {
  if (!api) {
    const axios = useAxiosInstance();

    api = {
      authentication: {
        list: () => axios('/v1/authentications', { method: 'get' }),
        sign_in: (data) => axios('/v1/authentications', { method: 'post', data }),
        sign_out: () => axios('/v1/authentications', { method: 'delete' }),
        revoke: (id) => axios(`/v1/authentications/revoke/${id}`, { method: 'delete' }),
      },
      user: {
        info: () => axios('/v1/user', { method: 'get' }),
        create: (data) => axios('/v1/user', { method: 'post', data }),
        verifyEmail: (data) => axios('/v1/user/email-verification', { method: 'post', data }),
        resendVerificationEmail: () =>
          axios('/v1/user/resend-email-verification', { method: 'post' }),
      },
      currencies: {
        list: () => axios('/v1/currencies', { method: 'get' }),
        rates: (params) => axios('/v1/currencies/rates', { method: 'get', params }),
      },
      companies: {
        list: () => axios('/v1/companies', { method: 'get' }),
        create: (data) => axios('/v1/companies', { method: 'post', data }),
        one: (id) => axios(`/v1/companies/${id}`, { method: 'get' }),
        update: (id, data) => axios(`/v1/companies/${id}`, { method: 'put', data }),
        delete: (id) => axios(`/v1/companies/${id}`, { method: 'delete' }),
        contracts: (id) => axios(`/v1/companies/${id}/contracts`, { method: 'get' }),
      },
      isAxiosError,
    };
  }

  return api;
};
