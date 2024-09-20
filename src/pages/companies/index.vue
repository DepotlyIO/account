<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';
import CompanyCard from '@/components/company/Card.vue';
import type { Company } from '@/types/models/company';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const companies = ref<Company[]>([]);

const loadCompanies = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.companies.list();
    companies.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadCompanies();

useHead(() => ({
  title: t('pages.companies.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-companies']">
    <div :class="$style['page-companies__head']">
      <UiText variant="h1">
        {{ $t('pages.companies.title') }}
      </UiText>

      <UiButton :to="{ name: 'companies-create' }" size="medium-compact">
        <UiIcon name="plus" color="color-white" />
      </UiButton>
    </div>

    <div :class="$style['page-companies__list']">
      <CompanyCard v-for="company in companies" :key="company.id" :company />
    </div>
  </div>
</template>

<style module lang="scss">
.page-companies {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
