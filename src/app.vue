<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead(() => ({
  titleTemplate: '%s - Depotly',
}));
</script>

<template>
  <RouterView />
</template>
