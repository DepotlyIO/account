import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';
import { useUserStore } from '@/stores/user';
import type { Currency, CurrencyRate, RequestNetworkCurrency } from '@/types/models/currency';

export const useCurrenciesStore = defineStore('currencies', () => {
  const api = useApi();
  const userStore = useUserStore();

  const currencies = ref<Currency[]>();
  const request_network_currencies = ref<RequestNetworkCurrency[]>([]);
  const rates = ref<CurrencyRate[]>();

  const defaultFiatCurrency = computed(() => userStore.user?.currency_code || 'USD');

  const loadCurrencies = async () => {
    try {
      const { data } = await api.currencies.list();
      currencies.value = data;
    } catch (e) {
      console.error(e);
    }
  };

  const loadRequestNetworkCurrencies = async () => {
    try {
      const { data } = await api.datasets.requestNetworkCurrencies();
      request_network_currencies.value = data;
    } catch (e) {
      console.error(e);
    }
  };

  const loadCurrenciesRates = async () => {
    try {
      const { data } = await api.currencies.rates({ currency_code: defaultFiatCurrency.value });
      rates.value = data;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    currencies,
    request_network_currencies,
    rates,
    defaultFiatCurrency,
    loadCurrencies,
    loadRequestNetworkCurrencies,
    loadCurrenciesRates,
  };
});
