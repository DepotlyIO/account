<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-index']">Home</div>
</template>

<style module lang="scss">
.page-index {
}
</style>
