<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import type { BlockchainContract } from '@/types/models/blockchain-contract';
import { BlockchainContractStatus } from '@/types/models/blockchain-contract';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';
import type { CompanyContract } from '@/types/models/company-contract';
import type { Company } from '@/types/models/company';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const contract_manipulating_loading = ref(false);
const company = ref<Company>();
const contract = ref<CompanyContract>();

const date = computed(
  () =>
    contract.value?.created_at &&
    new Intl.DateTimeFormat('en-GB').format(new Date(contract.value?.created_at)),
);

const amount = computed(
  () =>
    contract.value &&
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code',
    })
      .format(+contract.value.payment_amount)
      .replace('USD', contract.value.currency_code),
);

const isCreateContractButtonVisible = computed(
  () => contract.value && !contract.value.blockchain_contracts.length,
);

const lastContract = computed<BlockchainContract | undefined>(() => {
  if (!contract.value) return undefined;

  // @ts-expect-error TODO: some strange TS behaviour
  const [element] = contract.value.blockchain_contracts.toSorted((a, b) => b.id - a.id);

  return element;
});

const isUpdateVisible = computed(
  () =>
    !!lastContract.value &&
    [
      BlockchainContractStatus.UNKNOWN,
      BlockchainContractStatus.CREATING,
      BlockchainContractStatus.CREATED,
    ].includes(lastContract.value.status),
);

const isPayVisible = computed(
  () => !!lastContract.value && lastContract.value.status === BlockchainContractStatus.APPROVED,
);

const loadCompanyAndContract = async () => {
  if (
    loading.value ||
    typeof route.params.company_id !== 'string' ||
    typeof route.params.contract_id !== 'string'
  )
    return;

  loading.value = true;
  try {
    const [{ data: companyData }, { data: contractData }] = await Promise.all([
      api.companies.one(route.params.company_id),
      api.company_contracts.one(route.params.company_id, route.params.contract_id),
    ]);

    company.value = companyData;
    contract.value = contractData;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const createContract = async () => {
  if (
    contract_manipulating_loading.value ||
    typeof route.params.company_id !== 'string' ||
    typeof route.params.contract_id !== 'string'
  )
    return;

  contract_manipulating_loading.value = true;
  try {
    const { data } = await api.company_contracts.create_blockchain_contract(
      route.params.company_id,
      route.params.contract_id,
    );
    contract.value?.blockchain_contracts.push(data);
  } catch (e) {
    console.error(e);
  }
  contract_manipulating_loading.value = false;
};

const payContract = async () => {
  if (contract_manipulating_loading.value || !contract.value) return;

  contract_manipulating_loading.value = true;
  try {
    const [lastBlockchainContract] = contract.value.blockchain_contracts;

    const { data } = await api.company_contracts.pay_blockchain_contract(lastBlockchainContract.id);

    const updatedContractIndex = contract.value.blockchain_contracts.findIndex(
      (contract) => contract.id === data.id,
    );

    if (updatedContractIndex > -1) contract.value.blockchain_contracts[updatedContractIndex] = data;
  } catch (e) {
    console.error(e);
  }
  contract_manipulating_loading.value = false;
};

loadCompanyAndContract();

useHead(() => ({
  title: contract.value?.name,
}));
</script>

<template>
  <div :class="$style['page-companies-company-id-contracts-contract-id']">
    <div :class="$style['page-companies-company-id-contracts-contract-id__head']">
      <UiText variant="underline" color="color-gray">
        {{ date }}
      </UiText>

      <UiText variant="h4">
        {{ contract?.name }}
      </UiText>
    </div>

    <div :class="$style['page-companies-company-id-contracts-contract-id__data']">
      <UiText variant="h4">
        {{ $t('labels.payer') }}
      </UiText>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.name') }}: </UiText>

        <UiText>
          {{ company?.name }}
        </UiText>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.identification_number') }}: </UiText>

        <UiText>
          {{ company?.identification_number }}
        </UiText>
      </div>

      <div
        :class="[
          $style['page-companies-company-id-contracts-contract-id__row'],
          $style['page-companies-company-id-contracts-contract-id__row--3'],
        ]"
      >
        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.country') }}: </UiText>

          <UiText>
            {{ company?.country }}
          </UiText>
        </div>

        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.city') }}: </UiText>

          <UiText>
            {{ company?.city }}
          </UiText>
        </div>

        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.zip') }}: </UiText>

          <UiText>
            {{ company?.zip }}
          </UiText>
        </div>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.address') }}: </UiText>

        <UiText>
          {{ company?.address }}
        </UiText>
      </div>
    </div>

    <div :class="$style['page-companies-company-id-contracts-contract-id__data']">
      <UiText variant="h4">
        {{ $t('labels.payee') }}
      </UiText>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.name') }}: </UiText>

        <UiText>
          {{ contract?.name }}
        </UiText>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.identification_number') }}: </UiText>

        <UiText>
          {{ contract?.identification_number }}
        </UiText>
      </div>

      <div
        :class="[
          $style['page-companies-company-id-contracts-contract-id__row'],
          $style['page-companies-company-id-contracts-contract-id__row--3'],
        ]"
      >
        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.country') }}: </UiText>

          <UiText>
            {{ contract?.country }}
          </UiText>
        </div>

        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.city') }}: </UiText>

          <UiText>
            {{ contract?.city }}
          </UiText>
        </div>

        <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
          <UiText font-weight="600"> {{ $t('labels.zip') }}: </UiText>

          <UiText>
            {{ contract?.zip }}
          </UiText>
        </div>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.address') }}: </UiText>

        <UiText>
          {{ contract?.address }}
        </UiText>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.invoice_number') }}: </UiText>

        <UiText>
          {{ contract?.invoice_number }}
        </UiText>
      </div>
    </div>

    <div :class="$style['page-companies-company-id-contracts-contract-id__data']">
      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.amount') }}: </UiText>

        <UiText>
          {{ amount }}
        </UiText>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.due_date') }}: </UiText>

        <UiText>
          {{ contract?.due_date }}
        </UiText>
      </div>
    </div>

    <div
      v-if="lastContract"
      :class="$style['page-companies-company-id-contracts-contract-id__data']"
    >
      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.request_id') }}: </UiText>

        <UiText variant="underline" break-word>
          {{ lastContract.request_id }}
        </UiText>
      </div>

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.status') }}: </UiText>

        <UiText variant="underline" break-word>
          {{ lastContract.status }}
        </UiText>

        <UiButton v-if="isUpdateVisible" size="small-compact" @click="loadCompanyAndContract">
          <UiIcon name="update" color="color-white" />
        </UiButton>
      </div>
    </div>

    <UiButton
      v-if="isCreateContractButtonVisible"
      :loading="contract_manipulating_loading"
      color="color-green"
      @click="createContract"
    >
      {{ $t('actions.create_contract') }}
    </UiButton>

    <UiButton
      v-if="isPayVisible"
      :loading="contract_manipulating_loading"
      color="color-green"
      @click="payContract"
    >
      {{ $t('actions.pay_contract') }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.page-companies-company-id-contracts-contract-id {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__head {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid $color-border;
    background: $color-white;

    &__element {
      display: flex;
      gap: 10px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: inherit;

    &--2,
    &--3 {
      --columns: 1;
    }
  }

  @media #{$media-query-tablet} {
    &__head {
      flex-direction: row-reverse;
      justify-content: space-between;
      align-content: center;
    }

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
