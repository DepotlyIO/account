<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useCurrenciesStore } from '@/stores/currencies';
import CurrencyRates from '@/components/currency/Rates.vue';

const { t } = useI18n();
const currenciesStore = useCurrenciesStore();

currenciesStore.loadCurrencies();
currenciesStore.loadCurrenciesRates();

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-index']">
    <CurrencyRates />
  </div>
</template>

<style module lang="scss">
.page-index {
}
</style>
