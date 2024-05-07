<script setup lang="ts">
import { useHead } from '@unhead/vue';
import LayoutController from '@/components/LayoutController.vue';

useHead(() => ({
  titleTemplate: '%s - Depotly',
}));
</script>

<template>
  <LayoutController>
    <RouterView />
  </LayoutController>
</template>
