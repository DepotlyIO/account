import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';

export const useDatasetsStore = defineStore('datasets', () => {
  const api = useApi();

  const countries = ref<string[]>([]);

  const loadCountries = async () => {
    if (countries.value?.length) return;

    try {
      const { data } = await api.datasets.countries();
      countries.value = data;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    countries,
    loadCountries,
  };
});
