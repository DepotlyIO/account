<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import { useEtherscan } from '@/composables/useEtherscan';
import UiText from '@/components/ui/Text.vue';
import UiBadge from '@/components/ui/Badge.vue';
import UiCard from '@/components/ui/Card.vue';
import UiField from '@/components/ui/Field.vue';
import type { Color } from '@/types/assets/colors';
import { type Contract, ContractStatus, RecurrenceType } from '@/types/models/contract';

const route = useRoute();
const { t } = useI18n();
const api = useApi();
const { createAddressUrl } = useEtherscan();

const loading = ref(false);
const contract = ref<Contract>();

const routeContractId = computed(() => {
  const id = +route.params.id;
  return Number.isSafeInteger(id) ? id : undefined;
});
const badgeColor = computed<Color>(() => {
  switch (contract.value?.status) {
    case ContractStatus.ACTIVE:
      return 'color-green';
    case ContractStatus.REVOKED:
      return 'color-red';
    default:
      return 'color-gray';
  }
});
const walletUrl = computed(() => contract.value?.wallet && createAddressUrl(contract.value.wallet));
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

const loadContract = async () => {
  if (loading.value || !routeContractId.value) return;

  loading.value = true;
  try {
    const { data } = await api.contracts.one(routeContractId.value);
    contract.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadContract();

useHead(() => ({
  title: t('pages.contracts.id.index.meta.title', { id: contract.value?.id ?? '' }),
}));
</script>

<template>
  <div :class="$style['page-contracts-id']">
    <div :class="$style['page-contracts-id__header']">
      <UiText variant="h1">
        {{ $t('pages.contracts.id.index.title', { id: contract?.id }) }}
      </UiText>

      <UiText variant="h4">
        <UiBadge :color="badgeColor">{{ contract?.status }}</UiBadge>
      </UiText>
    </div>

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

    <UiCard :title="$t('pages.contracts.id.index.payee_requisites')">
      <div :class="$style['page-contracts-id__card']">
        <UiField :title="$t('pages.contracts.create.form.wallet.label')">
          <template #value>
            <a :href="walletUrl" target="_blank" :class="$style['page-contracts-id__wallet']">
              {{ contract?.wallet }}
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
  </div>
</template>

<style module lang="scss">
.page-contracts-id {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__card {
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
