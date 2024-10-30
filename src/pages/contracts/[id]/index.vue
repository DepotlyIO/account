<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import { useEtherscan } from '@/composables/useEtherscan';
import { useWalletsStore } from '@/stores/wallets';
import PageContractsIdPayment from '@/components/page/contracts/id/Payment.vue';
import UiText from '@/components/ui/Text.vue';
import UiCard from '@/components/ui/Card.vue';
import UiField from '@/components/ui/Field.vue';
import { type Contract, RecurrenceType } from '@/types/models/contract';
import { RequestNetworkContractStatus } from '@/types/models/request-network-contract';

const route = useRoute();
const { t } = useI18n();
const api = useApi();
const { createAddressUrl } = useEtherscan();
const walletsStore = useWalletsStore();

const loading = ref(false);
const interval = ref<number>();
const contract = ref<Contract>();

const routeContractId = computed(() => {
  const id = +route.params.id;
  return Number.isSafeInteger(id) ? id : undefined;
});
const requestNetworkRequest = computed(() => {
  const [request] = contract.value?.request_network_contracts.toSorted((a, b) => b.id - a.id) ?? [];

  return request;
});
const walletUrl = computed(
  () => contract.value && createAddressUrl(contract.value.payee_wallet_address),
);
const paymentAmount = computed(
  () =>
    contract.value &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    })
      .format(+contract.value.payment_amount)
      .replace('USD', contract.value.currency_code),
);
const recurrence = computed(() => {
  if (!contract.value) return undefined;

  switch (contract.value.recurrence_type) {
    case RecurrenceType.NON_RECURRENT:
      return t('labels.no');
    case RecurrenceType.DAILY:
      return t('labels.daily');
    case RecurrenceType.WEEKLY:
      return t('pages.contracts.id.index.every_n', {
        name: t(`labels.day_of_week.${contract.value.recurrence_day}.text`),
      });
    case RecurrenceType.MONTHLY:
      return t('pages.contracts.id.index.every_n_day_of_month', {
        day: contract.value.recurrence_day,
      });
    default:
      return undefined;
  }
});
const hasDueDate = computed(() => contract.value?.recurrence_type === RecurrenceType.NON_RECURRENT);

const loadContract = async (skipLoadingCheck = false) => {
  if (!routeContractId.value || (loading.value && !skipLoadingCheck)) return;

  loading.value = true;
  try {
    const { data } = await api.contracts.one(routeContractId.value);
    contract.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

// value: 'depotly' | 'web3'
const choseWallet = async () => {
  if (!contract.value || loading.value) return;

  loading.value = true;
  try {
    const id = walletsStore.wallets[0].id;
    const { data } = await api.contracts.assignWallet(contract.value.id, { wallet: { id } });
    contract.value.contract_wallet_id = data.contract_wallet_id;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const activateContract = async () => {
  if (!contract.value || loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.contracts.activate(contract.value.id);
    contract.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const payRequestNetworkRequest = async () => {
  if (!contract.value || loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.request_network_contracts.pay(requestNetworkRequest.value.id);
    const requestIndex = contract.value.request_network_contracts.findIndex(
      (contract) => contract.id === data.id,
    );
    if (requestIndex >= 0) contract.value.request_network_contracts.splice(requestIndex, 1, data);
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const switchInterval = (enable: boolean) => {
  if (enable) {
    interval.value = setInterval(() => loadContract(true), 3000);
  } else {
    clearInterval(interval.value);
  }
};

loadContract();

watch(
  () => contract.value,
  () => {
    if (!requestNetworkRequest.value) return;

    const isObservableStatus = [
      RequestNetworkContractStatus.CREATING,
      RequestNetworkContractStatus.TRANSACTION_CREATION,
      RequestNetworkContractStatus.TRANSACTION_CONFIRMATION,
    ].includes(requestNetworkRequest.value.status);

    if (isObservableStatus) {
      if (!interval.value) switchInterval(true);
    } else if (interval.value) {
      switchInterval(false);
    }
  },
);

useHead(() => ({
  title: t('pages.contracts.id.index.meta.title', { id: contract.value?.id ?? '' }),
}));
</script>

<template>
  <div :class="$style['page-contracts-id']">
    <UiText variant="h1">
      {{ $t('pages.contracts.id.index.title', { id: contract?.id }) }}
    </UiText>

    <PageContractsIdPayment
      v-if="contract"
      :contract
      :request-network-request
      :loading
      :observing="!!interval"
      @choose-wallet="choseWallet"
      @activate="activateContract"
      @pay="payRequestNetworkRequest"
    />

    <UiCard :title="$t('pages.contracts.id.index.payee_requisites')">
      <div :class="$style['page-contracts-id__card']">
        <UiField :title="$t('pages.contracts.create.form.payee_wallet_address.label')">
          <template #value>
            <a :href="walletUrl" target="_blank" :class="$style['page-contracts-id__wallet']">
              {{ contract?.payee_wallet_address }}
            </a>
          </template>
        </UiField>

        <UiField :title="$t('pages.contracts.id.index.payment_amount')" :value="paymentAmount" />
      </div>
    </UiCard>

    <UiCard :title="$t('pages.contracts.id.index.payment_settings')">
      <div :class="$style['page-contracts-id__card']">
        <div :class="$style['page-contracts-id__row--2']">
          <UiField :title="$t('pages.contracts.id.index.recurrence')" :value="recurrence" />

          <UiField
            v-if="hasDueDate"
            :title="$t('pages.contracts.create.form.due_date.label')"
            :value="contract?.due_date"
          />
        </div>

        <UiField
          :title="$t('pages.contracts.id.index.invoice_reference_number')"
          :value="contract?.invoice_number"
        />
      </div>
    </UiCard>

    <UiCard :title="$t('pages.contracts.id.index.payee_info')">
      <div :class="$style['page-contracts-id__card']">
        <div :class="$style['page-contracts-id__row--2']">
          <UiField :title="$t('pages.contracts.create.form.name.label')" :value="contract?.name" />

          <UiField
            :title="$t('pages.contracts.create.form.identification_number.label')"
            :value="contract?.identification_number"
          />
        </div>

        <div :class="$style['page-contracts-id__row--3']">
          <UiField
            :title="$t('pages.contracts.create.form.country.label')"
            :value="contract?.country"
          />

          <UiField
            :title="$t('pages.contracts.create.form.region.label')"
            :value="contract?.region"
          />

          <UiField :title="$t('pages.contracts.create.form.city.label')" :value="contract?.city" />
        </div>

        <div :class="$style['page-contracts-id__row--2']">
          <UiField
            :title="$t('pages.contracts.create.form.address.label')"
            :value="contract?.address"
          />

          <UiField :title="$t('pages.contracts.create.form.zip.label')" :value="contract?.zip" />
        </div>
      </div>
    </UiCard>
  </div>
</template>

<style module lang="scss">
.page-contracts-id {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__card,
  &__payment {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__row {
    &--2,
    &--3 {
      --columns: 1;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 0.5rem;
    }
  }

  &__wallet {
    word-break: break-all;
  }

  @media #{$media-query-tablet} {
    &__row {
      &--2 {
        --columns: 2;
      }

      &--3 {
        --columns: 3;
      }
    }
  }
}
</style>
