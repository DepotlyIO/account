<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { Color } from '@/types/assets/colors';
import { useCssVariable } from '@/composables/useCssVariable';

interface Props {
  color?: Color;
  corner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'color-blue',
  corner: false,
});

const style = useCssModule();

const componentClasses = computed(() => ({
  [style['ui-badge']]: true,
  [style['ui-badge--corner']]: props.corner,
}));
const color = computed(() => useCssVariable(props.color).value);
</script>

<template>
  <span :class="componentClasses">
    <slot />
  </span>
</template>

<style module lang="scss">
.ui-badge {
  padding: 0.35em 0.65em;
  border-radius: 9999px;
  font-size: 0.75em;
  line-height: 1;
  font-weight: 700;
  color: $color-white;
  background: v-bind(color);

  &--corner {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
  }
}
</style>
