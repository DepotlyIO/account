<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiDivider from '@/components/ui/Divider.vue';
import type { CompanyContract } from '@/types/models/company-contract';

const route = useRoute();
const api = useApi();

const loading = ref(false);
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

const loadContract = async () => {
  if (
    loading.value ||
    typeof route.params.company_id !== 'string' ||
    typeof route.params.contract_id !== 'string'
  )
    return;

  loading.value = true;
  try {
    const { data } = await api.company_contracts.one(
      route.params.company_id,
      route.params.contract_id,
    );

    contract.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadContract();

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

      <UiDivider />

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

      <UiDivider />

      <div :class="$style['page-companies-company-id-contracts-contract-id__data__element']">
        <UiText font-weight="600"> {{ $t('labels.status') }}: </UiText>

        <UiText>
          {{ contract?.status }}
        </UiText>
      </div>
    </div>
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
