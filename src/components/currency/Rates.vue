<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies';
import CurrencyRate from '@/components/currency/Rate.vue';

const currenciesStore = useCurrenciesStore();
</script>

<template>
  <div :class="$style['currency-rates__wrapper']">
    <div :class="$style['currency-rates']">
      <CurrencyRate
        v-for="rate in currenciesStore.rates"
        :key="`${rate.from}-${rate.to}`"
        :rate="rate"
        :class="$style['currency-rates__rate']"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.currency-rates {
  padding-inline: 20px;
  display: flex;
  gap: 10px;
  max-width: 100%;
  overflow: scroll;
  @include hide-scrollbar;

  &__wrapper {
    position: relative;

    &:before,
    &:after {
      position: absolute;
      inset-block-start: 0;
      height: 100%;
      width: 30px;
      background: linear-gradient(
        var(--gradient-angle),
        $color-gray-light 0%,
        $color-transparent 100%
      );
    }

    &:before {
      --gradient-angle: 90deg;

      content: '';
      inset-inline-start: 0;
    }

    &:after {
      --gradient-angle: 270deg;

      content: '';
      inset-inline-end: 0;
    }
  }

  &__rate {
    flex-shrink: 0;
  }
}
</style>
