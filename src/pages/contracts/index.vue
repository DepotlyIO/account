<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';
import type { Contract } from '@/types/models/contract';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const contracts = ref<Contract[]>([]);

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
  </div>
</template>

<style module lang="scss">
.page-contracts {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
