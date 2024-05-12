<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import type { CurrencyRate } from '@/types/models/currency';
import type { CurrencyIcon } from '@/types/assets/icons';
import type { Color } from '@/types/assets/colors';

interface Props {
  rate: CurrencyRate;
}

const props = defineProps<Props>();

const userStore = useUserStore();

const color = computed<Color>(() => {
  const change = +props.rate.percent_change_24h;
  switch (true) {
    case change < 0:
      return 'color-red';
    case change > 0:
      return 'color-green';
    default:
      return 'color-gray';
  }
});

const price = computed(() =>
  new Intl.NumberFormat(userStore.user?.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+props.rate.rate),
);
</script>

<template>
  <section :class="$style['currency-rate']">
    <div :class="$style['currency-rate__header']">
      <div :class="$style['currency-rate__header_start']">
        <UiIcon :name="props.rate.from.toLowerCase() as CurrencyIcon" sprite="currencies" />

        <UiText variant="h6">
          {{ props.rate.from }}
        </UiText>
      </div>

      <UiText :color="color">
        <UiIcon
          v-if="color !== 'color-gray'"
          :name="color === 'color-green' ? 'arrow-up-thin' : 'arrow-down-thin'"
          color="color-inherit"
        />
        {{ props.rate.percent_change_24h }}%
      </UiText>
    </div>

    <div :class="$style['currency-rate__content']">
      <UiText :color="color">
        {{ price }}
      </UiText>
    </div>
  </section>
</template>

<style module lang="scss">
.currency-rate {
  border: 1px solid $color-border;
  border-radius: 15px;
  padding: 15px;
  background: $color-white;
  width: 230px;

  &__header {
    display: flex;
    justify-content: space-between;

    &_start {
      display: flex;
      gap: 10px;
    }
  }

  &__content {
    margin-block-start: 5px;
  }
}
</style>
