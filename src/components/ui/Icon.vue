<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useCssVariable } from '@/composables/useCssVariable';
import main from '@/assets/sprites/main.svg';
import currencies from '@/assets/sprites/currencies.svg';
import type { Color } from '@/types/assets/colors';
import type { Icon, Sprite } from '@/types/assets/icons';

const styles = useCssModule();

interface Props {
  sprite?: Sprite;
  name: Icon;
  size?: number | string;
  color?: Color;
  rotate?: 0 | 90 | 180 | 270 | '0' | '90' | '180' | '270';
  rotateTransition?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  size: 24,
  color: 'color-black',
  backgroundShape: 'circle',
  rotate: 0,
  rotateTransition: false,
});

const spriteUrl = computed(() => {
  switch (props.sprite) {
    case 'currencies':
      return currencies;
    default:
      return main;
  }
});

const computedStyles = computed(() => ({
  color: useCssVariable(props.color).value,
  size: isNaN(+props.size) ? props.size : `${props.size}px`,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : 'none',
}));

const classes = computed(() => ({
  [styles['ui-icon']]: true,
  [styles['ui-icon--rotate-transition']]: props.rotateTransition,
}));
</script>

<template>
  <svg :class="classes">
    <use :xlink:href="`${spriteUrl}#${props.name}`" />
  </svg>
</template>

<style module lang="scss">
.ui-icon {
  width: v-bind('computedStyles.size');
  height: v-bind('computedStyles.size');
  color: v-bind('computedStyles.color');
  transform: v-bind('computedStyles.transform');

  &--rotate-transition {
    transition: transform $duration-medium;
  }
}
</style>
