<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import UiIcon from '@/components/ui/Icon.vue';
import type { MainIcon } from '@/types/assets/icons';

const { t } = useI18n();

interface RawMenuItem {
  name: string;
  icon: MainIcon;
}

const menuItems = computed(() =>
  (
    [
      {
        name: 'index',
        icon: 'home',
      },
      {
        name: 'wallets',
        icon: 'wallet-bifold',
      },
      {
        name: 'charts',
        icon: 'chart-bar',
      },
      {
        name: 'settings',
        icon: 'cog',
      },
    ] as RawMenuItem[]
  ).map((item) => ({
    name: item.name,
    icon: item.icon,
    text: t(`menu.${item.name}`),
  })),
);
</script>

<template>
  <div :class="$style['app-menu']">
    <RouterLink
      v-for="item in menuItems"
      :key="item.name"
      :to="{ name: item.name }"
      :class="$style['app-menu__item']"
      :active-class="$style['app-menu__item--active']"
    >
      <UiIcon :name="item.icon" color="color-inherit" />

      <span>{{ item.text }}</span>
    </RouterLink>
  </div>
</template>

<style module lang="scss">
.app-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $color-gray-light;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-black;

    &--active {
      color: $color-blue;
    }
  }
}
</style>
