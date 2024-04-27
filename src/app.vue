<script setup lang="ts">
import { useHead } from '@unhead/vue';
import AppLayout from '@/components/app/Layout.vue';

useHead(() => ({
  titleTemplate: '%s - Depotly',
}));
</script>

<template>
  <AppLayout />
</template>
