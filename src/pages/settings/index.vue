<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useUserStore } from '@/stores/user';
import UiCard from '@/components/ui/Card.vue';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';

const { t } = useI18n();

const userStore = useUserStore();

const accountType = computed(() => t(`labels.${userStore.user?.account_type}_account_type`));

useHead(() => ({
  title: t('pages.settings.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-settings']">
    <UiCard :class="$style['page-settings__account']">
      <UiIcon name="account-circle" size="200" color="color-gray" />

      <UiText variant="h3">{{ userStore.user?.name }}</UiText>

      <UiText color="color-gray">{{ userStore.user?.email }}</UiText>
      <UiText color="color-gray">{{ accountType }}</UiText>
    </UiCard>
  </div>
</template>

<style module lang="scss">
.page-settings {
  &__account {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
