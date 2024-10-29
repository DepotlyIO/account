<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/useApi';
import { useModalStore } from '@/stores/modal';
import { useWalletsStore } from '@/stores/wallets';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import type { Blockchain } from '@/types/models/wallet';

const { t } = useI18n();
const api = useApi();
const modalStore = useModalStore();
const walletsStore = useWalletsStore();

const loading = ref(false);

const canCreateNewWallet = computed(() => !walletsStore.wallets.length);
const content = computed(() =>
  canCreateNewWallet.value
    ? {
        title: t('modals.create_wallet.can_create.title'),
        button: t('modals.create_wallet.can_create.action'),
        action: () => createWallet('ethereum'),
      }
    : {
        title: t('modals.create_wallet.cannot_create.title'),
        button: t('actions.close'),
        action: () => modalStore.closeModal(),
      },
);

const loadWallets = async () => {
  if (loading.value || !canCreateNewWallet.value) return;

  loading.value = true;
  try {
    await walletsStore.loadWallets();
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const createWallet = async (blockchain: Blockchain) => {
  if (loading.value || !canCreateNewWallet.value) return;

  loading.value = true;
  try {
    const { data } = await api.wallets.create({ wallet: { blockchain } });
    walletsStore.wallets.push(data);
    modalStore.closeModal();
  } catch (e) {
    console.error(e);

    if (api.isAxiosError(e) && e.response?.status === 400) modalStore.closeModal();
  }
  loading.value = false;
};

loadWallets();
</script>

<template>
  <div :class="$style['modal-create-wallet']">
    <UiText align="center">
      {{ content.title }}
    </UiText>

    <UiButton :loading @click="content.action">
      {{ content.button }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.modal-create-wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
