<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modal';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';

const router = useRouter();
const modalStore = useModalStore();

const handleActionClick = () => {
  modalStore.closeModal();
  router.push({ name: 'wallets' });
};
</script>

<template>
  <div :class="$style['modal-wallet-required']">
    <UiText align="center">
      {{ $t('modals.wallet_required.title') }}
    </UiText>

    <UiButton @click="handleActionClick">
      {{ $t('modals.wallet_required.action') }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.modal-wallet-required {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
