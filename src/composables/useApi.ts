import { isAxiosError } from 'axios';
import { useAxiosInstance } from '@/composables/useAxiosInstance';
import type { Api } from '@/types/composables/use-api';

let api: Api;

export const useApi = (): Api => {
  if (!api) {
    const axios = useAxiosInstance();

    api = {
      datasets: {
        countries: () => axios('/v1/datasets/countries', { method: 'get' }),
        requestNetworkCurrencies: () =>
          axios('/v1/datasets/request-network-currencies', { method: 'get' }),
      },
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
        profile: {
          load: () => axios('/v1/user/profile', { method: 'get' }),
          update: (data) => axios('/v1/user/profile', { method: 'put', data }),
        },
      },
      currencies: {
        list: () => axios('/v1/currencies', { method: 'get' }),
        rates: (params) => axios('/v1/currencies/rates', { method: 'get', params }),
      },
      contracts: {
        list: () => axios('/v1/contracts', { method: 'get' }),
        one: (id) => axios(`/v1/contracts/${id}`, { method: 'get' }),
        create: (data) => axios('/v1/contracts', { method: 'post', data }),
        activate: (id) => axios(`/v1/contracts/${id}/activate`, { method: 'post' }),
      },
      request_network_contracts: {
        pay: (id) => axios(`/v1/request-network-contracts/${id}/pay`, { method: 'post' }),
      },
      wallets: {
        list: () => axios('/v1/wallets', { method: 'get' }),
        one: (blockchain) => axios(`/v1/wallets/${blockchain}`, { method: 'get' }),
        create: (data) => axios(`/v1/wallets`, { method: 'post', data }),
      },
      isAxiosError,
    };
  }

  return api;
};
