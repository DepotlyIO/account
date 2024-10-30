<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalStore } from '@/stores/modal';
import { useWalletsStore } from '@/stores/wallets';
import { ModalName } from '@/types/stores/modal';
import UiCard from '@/components/ui/Card.vue';
import UiField from '@/components/ui/Field.vue';
import UiBadge from '@/components/ui/Badge.vue';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import { type Contract, ContractStatus } from '@/types/models/contract';
import type { Color } from '@/types/assets/colors';
import {
  type RequestNetworkContract,
  RequestNetworkContractStatus,
} from '@/types/models/request-network-contract';

interface Props {
  contract: Contract;
  requestNetworkRequest: RequestNetworkContract;
  loading: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  chooseWallet: [value: 'depotly' | 'web3'];
  activate: [value: void];
  pay: [value: void];
}>();

const { t } = useI18n();
const modalStore = useModalStore();
const walletsStore = useWalletsStore();

const badge = computed(() => {
  let color: Color;

  switch (props.contract.status) {
    case ContractStatus.ACTIVE:
      color = 'color-green';
      break;
    case ContractStatus.REVOKED:
      color = 'color-red';
      break;
    default:
      color = 'color-gray';
  }

  return {
    color,
    title: t(`labels.contract_status.${props.contract.status}`),
  };
});

const contractWallet = computed(() =>
  walletsStore.wallets.find((wallet) => wallet.id === props.contract.contract_wallet_id),
);

const payWithDepotlyWallet = async () => {
  if (props.loading) return;

  if (walletsStore.wallets.length) {
    emits('chooseWallet', 'depotly');
  } else {
    modalStore.openModal(ModalName.WALLET_REQUIRED);
  }
};

walletsStore.loadWallets();
</script>

<template>
  <UiCard :title="$t('labels.payment')">
    <template #header-end>
      <UiBadge :color="badge.color">{{ badge.title }}</UiBadge>
    </template>

    <div :class="$style['page-contracts-id-payment__payment']">
      <template v-if="!contract.contract_wallet_id">
        <UiText variant="h6">Pay with</UiText>

        <div :class="$style['page-contracts-id-payment__row--2']">
          <UiButton :loading @click="payWithDepotlyWallet">
            {{ $t('labels.depotly_wallet') }}
          </UiButton>

          <UiButton color="color-gray" disabled>
            {{ $t('labels.web3_wallet') }}
          </UiButton>
        </div>
      </template>

      <div v-else :class="$style['page-contracts-id-payment__row']">
        <div :class="$style['page-contracts-id-payment__fields']">
          <UiField :title="$t('labels.payment_wallet')">
            <template #value>
              <RouterLink :to="{ name: 'wallets' }" target="_blank">
                {{ contractWallet?.address }}
              </RouterLink>
            </template>
          </UiField>

          <template v-if="requestNetworkRequest">
            <UiField :title="$t('labels.request_id')" :value="requestNetworkRequest.request_id" />

            <UiField
              :title="$t('labels.request_status')"
              :value="$t(`labels.request_network_contract_status.${requestNetworkRequest.status}`)"
            />

            <UiButton
              v-if="requestNetworkRequest.status === RequestNetworkContractStatus.READY_TO_PAY"
              @click="emits('pay')"
            >
              {{ $t('actions.pay_contract') }}
            </UiButton>
          </template>
        </div>

        <UiButton v-if="!requestNetworkRequest" @click="emits('activate')">
          {{ $t('actions.activate_contract') }}
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>

<style module lang="scss">
.page-contracts-id-payment {
  &__payment,
  &__fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    word-break: break-all;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    &--2 {
      --columns: 1;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 0.5rem;
    }
  }

  @media #{$media-query-tablet} {
    &__row {
      &--2 {
        --columns: 2;
      }
    }
  }
}
</style>
