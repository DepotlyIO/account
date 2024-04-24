import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { Color } from '@/types/assets/colors';

export const useCssVariable = (value: MaybeRefOrGetter<Color>) =>
  computed(() => `var(--${toValue(value)})`);
