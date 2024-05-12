<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useCurrenciesStore } from '@/stores/currencies';
import CurrencyRate from '@/components/currency/Rate.vue';

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
    <div :class="$style['page-index__rates']">
      <CurrencyRate
        v-for="rate in currenciesStore.rates"
        :key="`${rate.from}-${rate.to}`"
        :rate="rate"
        :class="$style['page-index__rates_rate']"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.page-index {
  &__rates {
    display: flex;
    gap: 10px;
    max-width: 100%;
    overflow: scroll;
    @include hide-scrollbar;

    &_rate {
      flex-shrink: 0;
    }
  }
}
</style>
