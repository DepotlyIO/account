<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import OrderBlock from '@/components/order/Block.vue';
import type { OrdersListOrder } from '@/types/models/order';
import type { PaginationData } from '@/types/misc';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const pagination = ref<PaginationData>();
const orders = ref<OrdersListOrder[]>([]);

const loadOrders = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const {
      data: { items, ...paginationData },
    } = await api.orders.list();
    pagination.value = paginationData;
    orders.value = items;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadOrders();

useHead(() => ({
  title: t('pages.orders.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-orders']">
    <UiText variant="h1" :class="$style['page-orders__title']"> Orders </UiText>

    <div :class="$style['page-orders__list']">
      <OrderBlock v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<style module lang="scss">
.page-orders {
  &__title {
    margin-block-end: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
