<script setup lang="ts">
import { computed, ref } from 'vue';
import UiText from '@/components/ui/Text.vue';
import UiFortInput from '@/components/ui/form/Input.vue';
import UiFormSelect from '@/components/ui/form/Select.vue';
import UiFormCheckbox from '@/components/ui/form/Checkbox.vue';
import UiFormDate from '@/components/ui/form/Date.vue';
import UiButton from '@/components/ui/Button.vue';
import type { UiFormSelectOption } from '@/components/ui/form/Select.vue';

const loading = ref(false);
const contract = ref({
  name: '',
  wallet: '',
  payment_amount: '',
  currency_code: 'USDT',
  persistent: true,
  due_date: '',
});

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
  if (loading.value) return;

  loading.value = true;
  try {
    console.log('2341523452345234523452345');
  } catch (e) {
    console.error(e);
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
      <UiFortInput
        v-model="contract.name"
        name="name"
        :label="$t('labels.name')"
        :placeholder="$t('labels.name')"
        :disabled="loading"
      />

      <UiFortInput
        v-model="contract.wallet"
        name="wallet"
        :label="$t('labels.wallet')"
        placeholder="0x9fF45..."
        :disabled="loading"
      />

      <div :class="$style['page-companies-company-id-contract-new__form__row']">
        <UiFortInput
          v-model="contract.payment_amount"
          name="payment-amount"
          :label="$t('labels.amount')"
          placeholder="1000.00"
          type="number"
          :disabled="loading"
        />

        <UiFormSelect
          v-model="contract.currency_code"
          :options="currencyCodeOptions"
          name="currency-code"
          :label="$t('labels.currency')"
          :disabled="loading"
        />
      </div>

      <UiFormCheckbox
        v-model="contract.persistent"
        name="persistent"
        :label="$t('labels.permanent')"
        :disabled="loading"
      />

      <UiFormDate
        v-model="contract.due_date"
        name="due_date"
        :label="$t('labels.due_date')"
        placeholder="YYYY-MM-DD"
      />

      <UiButton
        color="color-green"
        type="submit"
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
      grid-template-columns: repeat(2, 1fr);
      gap: inherit;
    }

    &__button {
      align-self: flex-start;
      margin-block-start: 10px;
    }
  }
}
</style>
