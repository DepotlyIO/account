<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useCssVariable } from '@/composables/useCssVariable';
import type { Color } from '@/types/assets/colors';

const styles = useCssModule();

interface Props {
  color?: Color;
  variant?: 'default' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'color-blue',
  variant: 'default',
  size: 'medium',
  type: 'button',
});

const computedClasses = computed(() => ({
  [styles['ui-button']]: true,
  [styles[`ui-button--variant-${props.variant}`]]: props.variant,
  [styles[`ui-button--size-${props.size}`]]: props.size,
}));

const computedStyles = computed(() => ({
  color: useCssVariable(props.color),
}));
</script>

<template>
  <button :type="props.type" :class="computedClasses">
    <slot />
  </button>
</template>

<style module lang="scss">
.ui-button {
  font-weight: 400;
  border: 1px solid;

  &--variant {
    &-default {
      border-color: v-bind('computedStyles.color');
      background-color: v-bind('computedStyles.color');
      color:;
    }

    &-outlined {
    }
  }

  &--size {
    &-small {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }

    &-medium {
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 1rem;
    }

    &-large {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 1.25rem;
    }
  }
}
</style>
