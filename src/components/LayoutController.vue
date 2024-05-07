<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const empty = defineAsyncComponent(() => import('@/components/layout/Empty.vue'));
const main = defineAsyncComponent(() => import('@/components/layout/Main.vue'));
const authentication = defineAsyncComponent(() => import('@/components/layout/Authentication.vue'));

const computedLayout = computed(() => {
  switch (route.meta.layout) {
    case 'authentication':
      return authentication;
    case 'main':
      return main;
    default:
      return empty;
  }
});
</script>

<template>
  <Suspense>
    <component :is="computedLayout">
      <slot />
    </component>
  </Suspense>
</template>
