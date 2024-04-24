<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useCssVariable } from '@/composables/useCssVariable';
import type { Color } from '@/types/assets/colors';

const styles = useCssModule();

interface Props {
  color?: Color;
  variant?: 'default' | 'outlined' | 'text';
  size?: 'small' | 'small-compact' | 'medium' | 'medium-compact' | 'large' | 'large-compact';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  rectangular?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'color-blue',
  variant: 'default',
  size: 'medium',
  type: 'button',
  disabled: false,
  rectangular: false,
});

const computedClasses = computed(() => ({
  [styles['ui-button']]: true,
  [styles[`ui-button--variant-${props.variant}`]]: props.variant,
  [styles[`ui-button--size-${props.size}`]]: props.size,
  [styles['ui-button--rectangular']]: props.rectangular,
}));

const secondColor = computed(() =>
  ['color-transparent', 'color-white', 'color-yellow'].includes(props.color)
    ? 'color-black'
    : 'color-white',
);

const computedStyles = computed(() => {
  const isTextVariant = props.variant === 'text';
  return {
    firstColor: useCssVariable(props.color).value,
    firstColorHover: useCssVariable(`${props.color}-${isTextVariant ? 'light' : 'hover'}`).value,
    firstColorActive: useCssVariable(`${props.color}-${isTextVariant ? 'light-active' : 'active'}`)
      .value,
    secondColor: useCssVariable(secondColor.value).value,
  };
});
</script>

<template>
  <button :type="props.type" :class="computedClasses">
    <slot />
  </button>
</template>

<style module lang="scss">
.ui-button {
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 400;
  cursor: pointer;
  transition-property: border-color, background-color, color;
  transition-duration: $duration-medium;

  &--variant {
    &-default {
      border-color: v-bind('computedStyles.firstColor');
      background-color: v-bind('computedStyles.firstColor');
      color: v-bind('computedStyles.secondColor');

      &:hover {
        border-color: v-bind('computedStyles.firstColorHover');
        background-color: v-bind('computedStyles.firstColorHover');
      }

      &:active {
        border-color: v-bind('computedStyles.firstColorActive');
        background-color: v-bind('computedStyles.firstColorActive');
      }
    }

    &-outlined {
      border-color: v-bind('computedStyles.firstColor');
      background-color: $color-transparent;
      color: v-bind('computedStyles.firstColor');

      &:hover {
        border-color: v-bind('computedStyles.firstColorHover');
        background-color: v-bind('computedStyles.firstColorHover');
        color: v-bind('computedStyles.secondColor');
      }

      &:active {
        border-color: v-bind('computedStyles.firstColorActive');
        background-color: v-bind('computedStyles.firstColorActive');
        color: v-bind('computedStyles.secondColor');
      }
    }

    &-text {
      border-color: $color-transparent;
      background-color: $color-transparent;
      color: v-bind('computedStyles.firstColor');

      &:hover {
        border-color: v-bind('computedStyles.firstColorHover');
        background-color: v-bind('computedStyles.firstColorHover');
      }

      &:active {
        border-color: v-bind('computedStyles.firstColorActive');
        background-color: v-bind('computedStyles.firstColorActive');
      }
    }
  }

  &--size {
    &-small {
      padding: 0.25rem 0.5rem;

      &,
      &-compact {
        border-radius: 0.25rem;
        font-size: 0.875rem;
      }

      &-compact {
        padding: 0.25rem;
      }
    }

    &-medium {
      padding: 0.375rem 0.75rem;

      &,
      &-compact {
        border-radius: 0.375rem;
        font-size: 1rem;
      }

      &-compact {
        padding: 0.375rem;
      }
    }

    &-large {
      padding: 0.5rem 1rem;

      &,
      &-compact {
        border-radius: 0.5rem;
        font-size: 1.25rem;
      }

      &-compact {
        padding: 0.5rem;
      }
    }
  }

  &--rectangular {
    border-radius: 0;
  }
}
</style>
