<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';
import ContractCard from '@/components/contract/Card.vue';
import { RecurrenceType, type Contract } from '@/types/models/contract';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const contracts = ref<Contract[]>([]);

const categorizedContracts = computed(() =>
  contracts.value.reduce(
    (acc, contract) => {
      if (contract.recurrence_type === RecurrenceType.NON_RECURRENT) {
        acc.non_recurrent.push(contract);
      } else {
        acc.recurrent.push(contract);
      }

      return acc;
    },
    {
      non_recurrent: [] as Contract[],
      recurrent: [] as Contract[],
    },
  ),
);

const loadContracts = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.contracts.list();
    contracts.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadContracts();

useHead(() => ({
  title: t('pages.contracts.index.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-contracts']">
    <div :class="$style['page-contracts__header']">
      <UiText variant="h1">
        {{ $t('pages.contracts.index.title') }}
      </UiText>

      <UiButton :to="{ name: 'contracts-create' }" size="medium-compact">
        <UiIcon name="plus" color="color-white" />
      </UiButton>
    </div>

    <div v-if="categorizedContracts.non_recurrent.length">
      <UiText variant="h4">
        {{ $t('labels.one_time_contracts') }}
      </UiText>

      <div :class="$style['page-contracts__list']">
        <ContractCard
          v-for="contract in categorizedContracts.non_recurrent"
          :key="contract.id"
          :contract
        />
      </div>
    </div>

    <div v-if="categorizedContracts.recurrent.length">
      <UiText variant="h4">
        {{ $t('labels.recurrent_contracts') }}
      </UiText>

      <div>
        <ContractCard
          v-for="contract in categorizedContracts.recurrent"
          :key="contract.id"
          :contract
        />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.page-contracts {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    --columns: 1;

    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
  }

  @media #{$media-query-tablet} {
    &__list {
      --columns: 2;
    }
  }
}
</style>
