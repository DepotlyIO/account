<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import UiText from '@/components/ui/Text.vue';
import type { Company } from '@/types/models/company';

interface Props {
  company: Company;
}

const props = defineProps<Props>();

const router = useRouter();

const companyPath = computed(() =>
  router.resolve({ name: 'companies-company-id', params: { company_id: props.company.id } }),
);
</script>

<template>
  <RouterLink :to="companyPath" :class="$style['company-card']">
    <UiText variant="h5">
      {{ props.company.name }}
    </UiText>
  </RouterLink>
</template>

<style module lang="scss">
.company-card {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid $color-border;
  background: $color-white;
}
</style>
