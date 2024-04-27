<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
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

      <UiText variant="underline" color="color-inherit" :class="$style['app-menu__item_text']">
        {{ item.text }}
      </UiText>
    </RouterLink>
  </div>
</template>

<style module lang="scss">
.app-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $color-white;
  border: 1px solid $color-border;
  border-radius: 20px;

  &__item {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    color: $color-black;

    &--active {
      color: $color-blue;
    }

    &_text {
      display: none;
    }
  }

  @media #{$media-query-tablet} {
    padding: 20px 13px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

    &__item {
      height: auto;
    }
  }

  @media #{$media-query-desktop} {
    padding: 20px;

    &__item {
      &_text {
        display: unset;
      }
    }
  }
}
</style>
