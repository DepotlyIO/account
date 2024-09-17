<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import type { MainIcon } from '@/types/assets/icons';

const { t } = useI18n();
const userStore = useUserStore();

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
        name: 'orders',
        icon: 'file-document',
      },
      {
        name: 'wallets',
        icon: 'wallet-bifold',
      },
      {
        name: 'account',
        icon: 'account-circle',
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
    <div :class="$style['app-menu__block']">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.name }"
        :class="$style['app-menu__block_item']"
        :active-class="$style['app-menu__block_item--active']"
      >
        <UiIcon :name="item.icon" color="color-inherit" />

        <UiText
          variant="underline"
          color="color-inherit"
          :class="$style['app-menu__block_item-text']"
        >
          {{ item.text }}
        </UiText>
      </RouterLink>
    </div>

    <div :class="$style['app-menu__block']">
      <RouterLink
        :to="{ name: 'authentication-sign-in' }"
        :class="$style['app-menu__block_item']"
        :active-class="$style['app-menu__block_item--active']"
        @click.prevent="() => userStore.signOut()"
      >
        <UiIcon name="exit-to-app" color="color-inherit" />

        <UiText
          variant="underline"
          color="color-inherit"
          :class="$style['app-menu__block_item-text']"
        >
          {{ t('actions.sign_out') }}
        </UiText>
      </RouterLink>
    </div>
  </div>
</template>

<style module lang="scss">
.app-menu {
  display: flex;

  &__block {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: $color-white;
    border: 1px solid $color-border;
    box-shadow: 0 0.25rem 1.5rem rgba(25, 28, 31, 0.1);
    border-radius: 20px;

    &_item {
      height: 100%;
      min-width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: $color-black;

      &--active {
        color: $color-blue;
      }

      &-text {
        display: none;
      }
    }

    &:not(:first-child) {
      display: none;
    }
  }

  @media #{$media-query-tablet} {
    flex-direction: column;
    gap: 20px;

    &__block {
      box-shadow: unset;
      padding: 20px 13px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;

      &_item {
        height: unset;
        min-width: unset;
        min-height: 30px;
      }

      &:not(:first-child) {
        display: unset;
      }
    }
  }

  @media #{$media-query-desktop} {
    &__block {
      padding: 20px;

      &_item {
        justify-content: flex-start;

        &-text {
          display: unset;
        }
      }
    }
  }
}
</style>
