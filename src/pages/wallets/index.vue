<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.wallets.meta.title'),
}));
</script>

<template>
  <div>Wallets</div>
</template>

<style module lang="scss"></style>
