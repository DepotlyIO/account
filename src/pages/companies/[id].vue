<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import type { Company } from '@/types/models/company';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const company = ref<Company>();

const loadCompany = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.companies.one(route.params.id);
    company.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadCompany();

useHead(() => ({
  title: company.value?.name,
}));
</script>

<template>
  <div :class="$style['page-companies-id']">
    <UiText variant="h1">
      {{ company?.name }}
    </UiText>
  </div>
</template>

<style module lang="scss">
.page-companies-id {
}
</style>
