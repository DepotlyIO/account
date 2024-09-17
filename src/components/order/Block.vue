<script setup lang="ts">
import { computed } from 'vue';
import { useDayJs } from '@/composables/useDayJs';
import UiText from '@/components/ui/Text.vue';
import type { OrdersListOrder } from '@/types/models/order';

interface Props {
  order: OrdersListOrder;
}

const props = defineProps<Props>();

const dayjs = useDayJs();

const date = computed(() => {
  const instance = dayjs(props.order.created_at);

  return {
    relative: instance.fromNow(),
    formatted: instance.format('LT L'),
  };
});

const sum = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' })
    .format(+props.order.price)
    .replace('USD', props.order.currency_code),
);
</script>

<template>
  <div :class="$style['order-block']">
    <div :class="$style['order-block__header']">
      <UiText :title="date.formatted" variant="underline">
        {{ date.relative }}
      </UiText>

      <RouterLink :to="{ name: 'orders-id', params: { id: props.order.id } }">
        <UiText variant="h2">
          {{ props.order.title }}
        </UiText>
      </RouterLink>
    </div>

    <div :class="$style['order-block__info']">
      <UiText color="color-green">
        {{ sum }}
      </UiText>

      <UiText>
        {{ props.order.customer.name }}
      </UiText>
    </div>
  </div>
</template>

<style module lang="scss">
.order-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
  border: 1px solid $color-border;
  border-radius: 20px;
  background: $color-white;

  &__header,
  &__info {
    display: flex;
    flex-direction: column;
  }

  &__header {
  }

  &__info {
  }

  @media #{$media-query-tablet} {
    &__header,
    &__info {
      justify-content: space-between;
      align-items: center;
    }

    &__header {
      flex-direction: row-reverse;
    }

    &__info {
      flex-direction: row;
    }
  }
}
</style>
