<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import { useDatasetsStore } from '@/stores/datasets';
import { useCurrenciesStore } from '@/stores/currencies';
import { RecurrenceType } from '@/types/models/contract';
import UiText from '@/components/ui/Text.vue';
import UiCard from '@/components/ui/Card.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiFormSelect, { type UiFormSelectOption } from '@/components/ui/form/Select.vue';
import UiFormDate from '@/components/ui/form/Date.vue';
import UiFormCheckbox from '@/components/ui/form/Checkbox.vue';
import UiButton from '@/components/ui/Button.vue';
import type { ContractData } from '@/types/models/contract';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const datasetsStore = useDatasetsStore();
const currenciesStore = useCurrenciesStore();

const loading = ref(false);
const contract = ref<ContractData['contract']>({
  name: '',
  identification_number: '',
  country: '',
  region: '',
  city: '',
  address: '',
  zip: '',
  invoice_number: '',
  payee_wallet_address: '',
  payment_amount: '',
  currency_code: '',
  due_date: '',
  recurrence_type: RecurrenceType.NON_RECURRENT,
  recurrence_day: 1,
});
const recurrent = ref(false);
const errors = ref<any>();

const countryOptions = computed<UiFormSelectOption[]>(() =>
  datasetsStore.countries.map((country) => ({
    text: country,
    value: country,
  })),
);

const recurrenceTypeOptions = computed(() => [
  {
    text: t('labels.daily'),
    value: RecurrenceType.DAILY,
  },
  {
    text: t('labels.weekly'),
    value: RecurrenceType.WEEKLY,
  },
  {
    text: t('labels.monthly'),
    value: RecurrenceType.MONTHLY,
  },
]);

const currencyOptions = computed(() =>
  currenciesStore.request_network_currencies.map((currency) => ({
    text: currency.name,
    value: currency.value,
  })),
);

const weekDayOptions = computed(() =>
  Array.from({ length: 7 }, (_, i) => {
    const key = `labels.day_of_week.${i + 1}`;

    return {
      text: t(`${key}.text`),
      value: t(`${key}.value`),
    };
  }),
);

const monthDayOptions = computed(() =>
  Array.from({ length: 28 }, (_, i) => {
    const day = i + 1;

    return {
      text: day,
      value: day,
    };
  }),
);

const recurrenceDayProps = computed(() => {
  switch (contract.value.recurrence_type) {
    case RecurrenceType.WEEKLY:
      return {
        label: t('pages.contracts.create.form.week_day.label'),
        options: weekDayOptions.value,
      };
    case RecurrenceType.MONTHLY:
      return {
        label: t('pages.contracts.create.form.month_day.label'),
        options: monthDayOptions.value,
      };
    default:
      return null;
  }
});

const createContract = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.contracts.create({ contract: contract.value });
    await router.push({ name: 'contracts-id', params: { id: data.id } });
  } catch (e) {
    console.error(e);

    if (api.isAxiosError(e) && e.response?.status === 422) errors.value = e.response.data.errors;
  }
  loading.value = false;
};

datasetsStore.loadCountries();
currenciesStore.loadRequestNetworkCurrencies();

useHead(() => ({
  title: t('pages.contracts.create.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-contracts-create']">
    <UiText variant="h1" :class="$style['page-contracts-create__title']">
      {{ $t('pages.contracts.create.title') }}
    </UiText>

    <form :class="$style['page-contracts-create__form']" @submit.prevent="createContract">
      <UiCard :title="$t('pages.contracts.create.payee_info')">
        <div :class="$style['page-contracts-create__card']">
          <div :class="$style['page-contracts-create__row__2']">
            <UiFormInput
              v-model="contract.name"
              :label="$t('pages.contracts.create.form.name.label')"
              :placeholder="$t('pages.contracts.create.form.name.placeholder')"
              :disabled="loading"
              :error="errors?.name"
              name="name"
            />

            <UiFormInput
              v-model="contract.identification_number"
              :label="$t('pages.contracts.create.form.identification_number.label')"
              :placeholder="$t('pages.contracts.create.form.identification_number.placeholder')"
              :disabled="loading"
              :error="errors?.identification_number"
              name="identification_number"
            />
          </div>

          <div :class="$style['page-contracts-create__row__3']">
            <UiFormSelect
              v-model="contract.country"
              :options="countryOptions"
              :label="$t('pages.contracts.create.form.country.label')"
              :placeholder="$t('pages.contracts.create.form.country.placeholder')"
              :disabled="loading"
              :error="errors?.country"
              name="country"
            />

            <UiFormInput
              v-model="contract.region"
              :label="$t('pages.contracts.create.form.region.label')"
              :placeholder="$t('pages.contracts.create.form.region.placeholder')"
              :disabled="loading"
              :error="errors?.region"
              name="region"
            />

            <UiFormInput
              v-model="contract.city"
              :label="$t('pages.contracts.create.form.city.label')"
              :placeholder="$t('pages.contracts.create.form.city.placeholder')"
              :disabled="loading"
              :error="errors?.city"
              name="city"
            />
          </div>

          <div :class="$style['page-contracts-create__row__2']">
            <UiFormInput
              v-model="contract.address"
              :label="$t('pages.contracts.create.form.address.label')"
              :placeholder="$t('pages.contracts.create.form.address.placeholder')"
              :disabled="loading"
              :error="errors?.address"
              name="address"
            />

            <UiFormInput
              v-model="contract.zip"
              :label="$t('pages.contracts.create.form.zip.label')"
              :placeholder="$t('pages.contracts.create.form.zip.placeholder')"
              :disabled="loading"
              :error="errors?.zip"
              name="zip"
            />
          </div>
        </div>
      </UiCard>

      <UiCard :title="$t('pages.contracts.create.payee_requisites')">
        <div :class="$style['page-contracts-create__card']">
          <UiFormInput
            v-model="contract.payee_wallet_address"
            :label="$t('pages.contracts.create.form.payee_wallet_address.label')"
            :placeholder="$t('pages.contracts.create.form.payee_wallet_address.placeholder')"
            :disabled="loading"
            :error="errors?.payee_wallet_address"
            name="payee_wallet_address"
          />

          <div :class="$style['page-contracts-create__row__2']">
            <UiFormInput
              v-model="contract.payment_amount"
              :label="$t('pages.contracts.create.form.payment_amount.label')"
              :placeholder="$t('pages.contracts.create.form.payment_amount.placeholder')"
              :disabled="loading"
              :error="errors?.payment_amount"
              name="payment_amount"
            />

            <UiFormSelect
              v-model="contract.currency_code"
              :options="currencyOptions"
              :label="$t('pages.contracts.create.form.currency_code.label')"
              :placeholder="$t('pages.contracts.create.form.currency_code.placeholder')"
              :disabled="loading"
              :error="errors?.currency_code"
              name="currency_code"
            />
          </div>
        </div>
      </UiCard>

      <UiCard :title="$t('pages.contracts.create.payment_settings')">
        <div :class="$style['page-contracts-create__card']">
          <UiFormCheckbox
            v-model="recurrent"
            :label="$t('pages.contracts.create.form.recurrent.label')"
            :disabled="loading"
            name="recurrent"
          />

          <template v-if="recurrent">
            <div :class="$style['page-contracts-create__row__2']">
              <UiFormSelect
                v-model="contract.recurrence_type"
                :options="recurrenceTypeOptions"
                :label="$t('pages.contracts.create.form.recurrence_type.label')"
                :placeholder="$t('pages.contracts.create.form.recurrence_type.placeholder')"
                :disabled="loading"
                :error="errors?.recurrence_type"
                name="recurrence_type"
              />

              <UiFormSelect
                v-if="recurrenceDayProps"
                v-model="contract.recurrence_day"
                v-bind="recurrenceDayProps"
                :disabled="loading"
                :error="errors?.recurrence_day"
                name="recurrence_day"
              />
            </div>

            <UiFormInput
              v-model="contract.invoice_number"
              :label="$t('pages.contracts.create.form.invoice_number_recurrent.label')"
              :placeholder="$t('pages.contracts.create.form.invoice_number_recurrent.placeholder')"
              :disabled="loading"
              :error="errors?.invoice_number"
              name="invoice_number"
            />
          </template>

          <div v-else :class="$style['page-contracts-create__row__2']">
            <UiFormInput
              v-model="contract.invoice_number"
              :label="$t('pages.contracts.create.form.invoice_number.label')"
              :placeholder="$t('pages.contracts.create.form.invoice_number.placeholder')"
              :disabled="loading"
              :error="errors?.invoice_number"
              name="invoice_number"
            />

            <UiFormDate
              v-model="contract.due_date"
              :label="$t('pages.contracts.create.form.due_date.label')"
              :disabled="loading"
              :error="errors?.due_date"
              name="due_date"
            />
          </div>
        </div>
      </UiCard>

      <UiButton size="large" type="submit">
        {{ $t('actions.create_contract') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-contracts-create {
  &__title {
    margin-block-end: 1rem;
  }

  &__form,
  &__card {
    display: flex;
    flex-direction: column;
  }

  &__form {
    gap: 1.5rem;
  }

  &__card {
    gap: 1rem;
  }

  &__row {
    &__2,
    &__3 {
      --columns: 1;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 1rem;
    }
  }

  @media #{$media-query-tablet} {
    &__row {
      &__2 {
        --columns: 2;
      }

      &__3 {
        --columns: 3;
      }
    }
  }
}
</style>
