import { computed, ref, toValue, watchEffect, onUnmounted } from 'vue';
import { useDayJs } from '@/composables/useDayJs';
import type { MaybeRefOrGetter } from 'vue';
import type { Dayjs } from 'dayjs';

export const useTimer = (finishTime: MaybeRefOrGetter<string | Dayjs>) => {
  const dayjs = useDayJs();

  let interval: number | undefined;

  const diff = ref(0);

  const format = computed(() => {
    switch (true) {
      // More than hour
      case diff.value > 60 * 60 * 1000:
        return 'HH:mm:ss';
      // Less than hour, more that minute
      case diff.value > 60 * 1000:
        return 'mm:ss';
      // Less than minute
      default:
        return 'ss';
    }
  });

  const setupInterval = () => {
    stopInterval();

    interval = setInterval(() => {
      diff.value -= 1000;

      if (diff.value < 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const stopInterval = () => {
    if (interval !== undefined) clearInterval(interval);
    interval = undefined;
  };

  watchEffect(() => {
    const value = toValue(finishTime);
    diff.value = dayjs(value).diff();
    setupInterval();
  });

  onUnmounted(stopInterval);

  return computed(() =>
    diff.value > 0 ? dayjs.duration(diff.value, 'millisecond').format(format.value) : undefined,
  );
};
