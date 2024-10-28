<script setup lang="ts">
import { computed } from 'vue';
import UiText from '@/components/ui/Text.vue';

interface Props {
  title: string;
  value?: string | null;
}

const props = defineProps<Props>();

const computedValue = computed(() => props.value ?? '-');
</script>

<template>
  <div :class="$style['ui-field']">
    <UiText font-weight="700">
      {{ props.title }}
    </UiText>

    <UiText>
      {{ computedValue }}
    </UiText>
  </div>
</template>

<style module lang="scss">
.ui-field {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
</style>
