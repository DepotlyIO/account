<script setup lang="ts">
import { computed } from 'vue';
import { formatCryptocurrency } from '@/utils/helpers';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import type { WalletCurrency } from '@/types/stores/wallets';
import type { CurrencyIcon } from '@/types/assets/icons';

interface Props {
  walletCurrency: WalletCurrency;
}

const props = defineProps<Props>();

const icon = computed(() => props.walletCurrency.currency_code.toLocaleLowerCase() as CurrencyIcon);

const balance = computed(() =>
  formatCryptocurrency(
    props.walletCurrency.currency_code,
    props.walletCurrency.balance,
    props.walletCurrency.decimals,
  ),
);
</script>

<template>
  <section :class="$style['wallet-card']">
    <div :class="$style['wallet-card__header']">
      <UiIcon sprite="currencies" :name="icon" />

      <UiText variant="h5">
        {{ props.walletCurrency.name }}
      </UiText>
    </div>

    <div :class="$style['wallet-card__address']">
      <UiText variant="h6">{{ $t('labels.address') }}: </UiText>
      <UiText :class="$style['wallet-card__address__address']">
        {{ props.walletCurrency.address }}
      </UiText>
    </div>

    <div :class="$style['wallet-card__balance']">
      <UiText variant="h6">{{ $t('labels.balance') }}: </UiText>
      <UiText>{{ balance }}</UiText>
    </div>
  </section>
</template>

<style module lang="scss">
.wallet-card {
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid $color-border;
  background: $color-white;

  &__header,
  &__address,
  &__balance {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__header {
    margin-block-end: 0.5rem;
  }

  &__address {
    &_address {
      word-break: break-all;
    }
  }
}
</style>
