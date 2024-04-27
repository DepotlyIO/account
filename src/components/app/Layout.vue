<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const main = defineAsyncComponent(() => import('@/components/layouts/Main.vue'));
const authentication = defineAsyncComponent(
  () => import('@/components/layouts/Authentication.vue'),
);

const computedLayout = computed(() => {
  switch (route.meta.layout) {
    case 'authentication':
      return authentication;
    default:
      return main;
  }
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="computedLayout">
        <component :is="Component" />
      </component>
    </Suspense>
  </RouterView>
</template>
