<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiFortInput from '@/components/ui/form/Input.vue';
import UiFormSelect from '@/components/ui/form/Select.vue';
import UiFormCheckbox from '@/components/ui/form/Checkbox.vue';
import UiFormDate from '@/components/ui/form/Date.vue';
import UiButton from '@/components/ui/Button.vue';
import type { UiFormSelectOption } from '@/components/ui/form/Select.vue';
import type { CompanyContractData } from '@/types/models/company-contract';

const route = useRoute();
const router = useRouter();
const api = useApi();

const loading = ref(false);
const contract = ref<CompanyContractData['company_contract']>({
  name: '',
  identification_number: '',
  country: '',
  city: '',
  address: '',
  zip: '',
  invoice_number: '',
  wallet: '',
  payment_amount: '',
  currency_code: 'USDT',
  due_date: '',
  recurrent: false,
});
const errors = ref<any | undefined>();
const errorMessage = ref('');

const currencyCodeOptions = computed<UiFormSelectOption[]>(() => [
  {
    text: 'USDT ERC-20',
    value: 'USDT',
  },
  {
    text: 'ETH',
    value: 'ETH',
  },
]);

const handleFormSubmit = async () => {
  if (loading.value || typeof route.params.company_id !== 'string') return;

  errors.value = undefined;
  errorMessage.value = '';
  loading.value = true;
  try {
    const { data } = await api.companies.create_contract(route.params.company_id, {
      company_contract: contract.value,
    });

    await router.replace({
      name: 'companies-company-id-contracts-contract-id',
      params: { company_id: data.company_id, contract_id: data.id },
    });
  } catch (e) {
    console.error(e);

    if (api.isAxiosError(e) && e.status === 422) {
      errorMessage.value = e.response?.data.message;
      errors.value = e.response?.data.errors;
    }
  }
  loading.value = false;
};
</script>

<template>
  <div :class="$style['page-companies-company-id-contract-new']">
    <UiText variant="h4">
      {{ $t('pages.companies.company.contract.new.title') }}
    </UiText>

    <form
      :class="$style['page-companies-company-id-contract-new__form']"
      @submit.prevent="handleFormSubmit"
    >
      <div
        :class="[
          $style['page-companies-company-id-contract-new__form__row'],
          $style['page-companies-company-id-contract-new__form__row--2'],
        ]"
      >
        <UiFortInput
          v-model="contract.name"
          name="name"
          :label="$t('pages.companies.company.contract.new.form.name.title')"
          :placeholder="$t('pages.companies.company.contract.new.form.name.placeholder')"
          :error="errors?.name"
          :disabled="loading"
        />

        <UiFortInput
          v-model="contract.identification_number"
          name="identification-number"
          :label="$t('pages.companies.company.contract.new.form.identification_number.title')"
          :placeholder="
            $t('pages.companies.company.contract.new.form.identification_number.placeholder')
          "
          :error="errors?.identification_number"
          :disabled="loading"
        />
      </div>

      <div
        :class="[
          $style['page-companies-company-id-contract-new__form__row'],
          $style['page-companies-company-id-contract-new__form__row--3'],
        ]"
      >
        <UiFortInput
          v-model="contract.country"
          name="country"
          :label="$t('pages.companies.company.contract.new.form.country.title')"
          :placeholder="$t('pages.companies.company.contract.new.form.country.placeholder')"
          :error="errors?.country"
          :disabled="loading"
        />

        <UiFortInput
          v-model="contract.city"
          name="city"
          :label="$t('pages.companies.company.contract.new.form.city.title')"
          :placeholder="$t('pages.companies.company.contract.new.form.city.placeholder')"
          :error="errors?.city"
          :disabled="loading"
        />

        <UiFortInput
          v-model="contract.zip"
          name="zip"
          :label="$t('pages.companies.company.contract.new.form.zip.title')"
          :placeholder="$t('pages.companies.company.contract.new.form.zip.placeholder')"
          :error="errors?.zip"
          :disabled="loading"
        />
      </div>

      <UiFortInput
        v-model="contract.address"
        name="address"
        :label="$t('pages.companies.company.contract.new.form.address.title')"
        :placeholder="$t('pages.companies.company.contract.new.form.address.placeholder')"
        :error="errors?.address"
        :disabled="loading"
      />

      <div
        :class="[
          $style['page-companies-company-id-contract-new__form__row'],
          $style['page-companies-company-id-contract-new__form__row--2'],
        ]"
      >
        <UiFormCheckbox
          v-model="contract.recurrent"
          name="recurrent"
          :label="$t('labels.permanent')"
          :error="errors?.recurrent"
          :disabled="loading"
        />

        <UiFormDate
          v-model="contract.due_date"
          name="due_date"
          :label="$t('labels.due_date')"
          placeholder="YYYY-MM-DD"
          :error="errors?.due_date"
          :disabled="loading"
        />
      </div>

      <UiFortInput
        v-model="contract.invoice_number"
        name="invoice-number"
        :label="$t('pages.companies.company.contract.new.form.invoice_number.title')"
        :placeholder="$t('pages.companies.company.contract.new.form.invoice_number.placeholder')"
        :error="errors?.invoice_number"
        :disabled="loading"
      />

      <UiFortInput
        v-model="contract.wallet"
        name="wallet"
        :label="$t('labels.wallet')"
        placeholder="0x9fF45..."
        :error="errors?.wallet"
        :disabled="loading"
      />

      <div
        :class="[
          $style['page-companies-company-id-contract-new__form__row'],
          $style['page-companies-company-id-contract-new__form__row--2'],
        ]"
      >
        <UiFortInput
          v-model="contract.payment_amount"
          name="payment-amount"
          :label="$t('labels.amount')"
          placeholder="1000.00"
          type="number"
          :error="errors?.payment_amount"
          :disabled="loading"
        />

        <UiFormSelect
          v-model="contract.currency_code"
          :options="currencyCodeOptions"
          name="currency-code"
          :label="$t('labels.currency')"
          :error="errors?.currency_code"
          :disabled="loading"
        />
      </div>

      <UiButton
        color="color-green"
        type="submit"
        :loading
        :class="$style['page-companies-company-id-contract-new__form__button']"
      >
        {{ $t('actions.create_contract') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-companies-company-id-contract-new {
  &,
  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__form {
    &__row {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: inherit;

      &--2,
      &--3 {
        --columns: 1;
      }
    }

    &__button {
      align-self: flex-start;
      margin-block-start: 10px;
    }
  }

  @media #{$media-query-tablet} {
    &__form {
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
}
</style>
