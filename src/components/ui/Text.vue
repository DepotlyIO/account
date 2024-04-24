<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useCssVariable } from '@/composables/useCssVariable';
import type { Color } from '@/types/assets/colors';

const styles = useCssModule();

interface Props {
  variant?: 'regular' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  tag?: 'div';
  color?: Color;
  align?: 'start' | 'center' | 'end';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'regular',
  color: 'color-black',
  align: 'start',
});

const computedComponent = computed(() =>
  props.tag ?? ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(props.variant) ? props.variant : 'div',
);

const computedClasses = computed(() => ({
  [styles['ui-text']]: true,
  [styles[`ui-text--variant-${props.variant}`]]: props.variant,
  [styles[`ui-text--align-${props.align}`]]: props.align,
}));

const computedStyles = computed(() => ({
  color: useCssVariable(props.color).value,
}));
</script>

<template>
  <component :is="computedComponent" :class="computedClasses">
    <slot></slot>
  </component>
</template>

<style module lang="scss">
.ui-text {
  color: v-bind('computedStyles.color');

  &--variant {
    &-h1,
    &-h2,
    &-h3,
    &-h4,
    &-h5,
    &-h6 {
      font-weight: 500;
    }

    &-lead {
      font-size: 1.25rem;
      font-weight: 300;
    }

    &-underline {
      font-size: 0.875em;
    }

    &-h1 {
      font-size: calc(1.375rem + 1.5vw);
    }

    &-h2 {
      font-size: calc(1.325rem + 0.9vw);
    }

    &-h3 {
      font-size: calc(1.3rem + 0.6vw);
    }

    &-h4 {
      font-size: calc(1.275rem + 0.3vw);
    }

    &-h5 {
      font-size: 1.25rem;
    }

    &-h6 {
      font-size: 1rem;
    }
  }

  &--align {
    &-start {
      text-align: start;
    }

    &-center {
      text-align: center;
    }

    &-end {
      text-align: end;
    }
  }
}
</style>
