<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.orders.meta.title'),
}));
</script>

<template>
  <div>Orders</div>
</template>

<style lang="scss"></style>
