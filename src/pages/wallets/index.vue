<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useWalletsStore } from '@/stores/wallets';
import { useModalStore } from '@/stores/modal';
import UiText from '@/components/ui/Text.vue';
import WalletCard from '@/components/wallet/Card.vue';
import UiCard from '@/components/ui/Card.vue';
import UiButton from '@/components/ui/Button.vue';
import { ModalName } from '@/types/stores/modal';

const { t } = useI18n();
const walletsStore = useWalletsStore();
const modalStore = useModalStore();

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

    <div v-if="walletsStore.walletsCurrencies.length" :class="$style['page-wallets__wallets']">
      <WalletCard
        v-for="walletCurrency in walletsStore.walletsCurrencies"
        :key="walletCurrency.currency_code"
        :wallet-currency="walletCurrency"
      />
    </div>

    <UiCard v-else>
      <div :class="$style['page-wallets__create']">
        <UiText color="color-gray">
          {{ $t('pages.wallets.no_wallets') }}
        </UiText>

        <UiButton color="color-green" @click="() => modalStore.openModal(ModalName.CREATE_WALLET)">
          {{ $t('actions.open_wallet') }}
        </UiButton>
      </div>
    </UiCard>
  </div>
</template>

<style module lang="scss">
.page-wallets {
  gap: 25px;

  &,
  &__wallets,
  &__create {
    display: flex;
    flex-direction: column;
  }

  &__wallets {
    gap: 10px;
  }

  &__create {
    min-height: 300px;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
