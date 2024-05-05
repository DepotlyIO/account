import { computed, ref, onUnmounted } from 'vue';
import { useDayJs } from '@/composables/useDayJs';
import type { Dayjs } from 'dayjs';

export const useTimer = (finishTime?: string | Dayjs) => {
  const dayjs = useDayJs();

  const diff = ref<number>(dayjs(finishTime).diff());

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

  const interval = setInterval(() => {
    diff.value -= 1000;

    if (diff.value < 0) {
      clearInterval(interval);
    }
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });

  return computed(() =>
    diff.value > 0 ? dayjs.duration(diff.value, 'millisecond').format(format.value) : undefined,
  );
};
