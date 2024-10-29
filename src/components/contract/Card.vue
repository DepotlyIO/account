<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatCryptocurrency } from '@/utils/helpers';
import UiCard from '@/components/ui/Card.vue';
import UiText from '@/components/ui/Text.vue';
import { type Contract, RecurrenceType } from '@/types/models/contract';

interface Props {
  contract: Contract;
}

const props = defineProps<Props>();

const { t } = useI18n();

const title = computed(() => `#${props.contract.id}`);
const name = computed(() => `${props.contract.name} - ${props.contract.invoice_number}`);
const recurrence = computed(() => {
  switch (props.contract.recurrence_type) {
    case RecurrenceType.DAILY:
      return t('labels.daily');
    case RecurrenceType.WEEKLY:
      return t('pages.contracts.id.index.every_n', {
        name: t(`labels.day_of_week.${props.contract.recurrence_day}.text`),
      });
    case RecurrenceType.MONTHLY:
      return t('pages.contracts.id.index.every_n_day_of_month', {
        day: props.contract.recurrence_day,
      });
    default:
      return undefined;
  }
});
const paymentSum = computed(() => {
  const sum = formatCryptocurrency(props.contract.currency_code, props.contract.payment_amount);

  return recurrence.value ? `${sum} - ${recurrence.value}` : sum;
});
</script>

<template>
  <RouterLink :to="{ name: 'contracts-id', params: { id: props.contract.id } }">
    <UiCard :title>
      <div :class="$style['contract-card__card']">
        <UiText font-weight="600">
          {{ name }}
        </UiText>

        <UiText>
          {{ paymentSum }}
        </UiText>
      </div>
    </UiCard>
  </RouterLink>
</template>

<style module lang="scss">
.contract-card {
  &__card {
    display: flex;
    flex-direction: column;
  }
}
</style>
