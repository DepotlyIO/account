<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const main = defineAsyncComponent(() => import('@/components/layout/Main.vue'));
const authentication = defineAsyncComponent(() => import('@/components/layout/Authentication.vue'));

const computedLayout = computed(() => {
  switch (route.meta.layout) {
    case 'authentication':
      return authentication;
    case 'main':
      return main;
    default:
      return undefined;
  }
});
</script>

<template>
  <Suspense>
    <div v-if="!computedLayout"></div>

    <component v-else :is="computedLayout">
      <slot />
    </component>
  </Suspense>
</template>
