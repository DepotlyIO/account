<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useWalletsStore } from '@/stores/wallets';
import UiText from '@/components/ui/Text.vue';
import WalletCard from '@/components/wallet/Card.vue';

const { t } = useI18n();
const walletsStore = useWalletsStore();

walletsStore.loadWallets();

useHead(() => ({
  title: t('pages.wallets.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-wallets']">
    <UiText variant="h1">
      {{ $t('pages.wallets.title') }}
    </UiText>

    <div :class="$style['page-wallets__wallets']">
      <WalletCard
        v-for="walletCurrency in walletsStore.walletsCurrencies"
        :key="walletCurrency.currency_code"
        :wallet-currency="walletCurrency"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.page-wallets {
  gap: 25px;

  &,
  &__wallets {
    display: flex;
    flex-direction: column;
  }

  &__wallets {
    gap: 10px;
  }
}
</style>
