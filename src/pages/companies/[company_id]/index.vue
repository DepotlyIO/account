<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';
import ElementDataTable from '@/components/element/DataTable.vue';
import type { Company } from '@/types/models/company';
import type { CompanyContract } from '@/types/models/company-contract';

type ContractGroup = 'temporary' | 'permanent' | 'closed';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const company = ref<Company>();
const workers = ref<CompanyContract[]>([]);

const groupedWorkers = computed<Record<ContractGroup, CompanyContract[]>>(() =>
  workers.value.reduce(
    (acc, value) => {
      switch (true) {
        case value.recurrent:
          acc.permanent.push(value);
          break;
        case !value.recurrent:
          acc.temporary.push(value);
          break;
        default:
          acc.closed.push(value);
      }

      return acc;
    },
    {
      temporary: [],
      permanent: [],
      closed: [],
    } as Record<ContractGroup, CompanyContract[]>,
  ),
);

const tables = computed(() => [
  {
    key: 'temporary',
    title: t('pages.companies.company.tables_name.temporary'),
    columns: [
      {
        name: 'name',
        title: t('labels.name'),
      },
      {
        name: 'email',
        title: t('labels.email'),
      },
      {
        name: 'amount',
        title: t('labels.amount'),
      },
      {
        name: 'due_date',
        title: t('labels.due_date'),
      },
    ],
    items: groupedWorkers.value.temporary,
  },
  {
    key: 'permanent',
    title: t('pages.companies.company.tables_name.permanent'),
    columns: [
      {
        name: 'name',
        title: t('labels.name'),
      },
      {
        name: 'email',
        title: t('labels.email'),
      },
      {
        name: 'latest_payment',
        title: t('labels.latest_payment'),
      },
      {
        name: 'next_payment',
        title: t('labels.next_payment'),
      },
    ],
    items: groupedWorkers.value.permanent,
  },
  {
    key: 'closed',
    title: t('pages.companies.company.tables_name.closed'),
    columns: [
      {
        name: 'name',
        title: t('labels.name'),
      },
      {
        name: 'email',
        title: t('labels.email'),
      },
      {
        name: 'updated_at',
        title: t('labels.updated_at'),
      },
    ],
    items: groupedWorkers.value.closed,
  },
]);

const loadCompany = async () => {
  if (loading.value || typeof route.params.company_id !== 'string') return;

  loading.value = true;
  try {
    const { data } = await api.companies.one(route.params.company_id);
    company.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const loadContracts = async () => {
  if (!company.value || typeof route.params.company_id !== 'string') return;

  try {
    const { data } = await api.companies.contracts(route.params.company_id);
    workers.value = data;
  } catch (e) {
    console.error(e);
  }
};

loadCompany().then(() => loadContracts());

useHead(() => ({
  title: company.value?.name,
}));
</script>

<template>
  <div :class="$style['page-companies-id']">
    <div :class="$style['page-companies-id__head']">
      <UiText variant="h3">
        {{ company?.name }}
      </UiText>

      <UiButton
        :to="{ name: 'companies-company-id-contracts-new' }"
        size="small"
        color="color-green"
      >
        <UiIcon name="plus" color="color-white" size="18" />

        {{ $t('actions.create_contract') }}
      </UiButton>
    </div>

    <div :class="$style['page-companies-id__tables']">
      <div
        v-for="table in tables"
        :key="table.key"
        :class="$style['page-companies-id__tables__table']"
      >
        <UiText variant="h5">
          {{ table.title }}
        </UiText>

        <ElementDataTable :columns="table.columns" :items="table.items" />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.page-companies-id {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  &__tables {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__table {
    }
  }

  @media #{$media-query-tablet} {
    &__head {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
