<script setup lang="ts">
import AppMenu from '@/components/app/Menu.vue';
import AppUpdate from '@/components/app/Update.vue';
</script>

<template>
  <div :class="$style['layout-default']">
    <div :class="$style['layout-default__wrapper']">
      <AppMenu :class="$style['layout-default__menu']" />

      <main :class="$style['layout-default__main']">
        <AppUpdate :class="$style['layout-default__main_update']" />

        <slot />
      </main>
    </div>
  </div>
</template>

<style module lang="scss">
.layout-default {
  background: $color-gray-light;

  &__menu {
    position: fixed;
    inset-block-end: 20px;
    inset-inline: 20px;
    width: calc(100% - 40px);
    height: $app-menu-mobile-height;
  }

  &__main {
    padding: 10px 10px calc($app-menu-mobile-height + 40px);
    min-height: 100dvh;

    &_update {
      margin-block-end: 1rem;
    }
  }

  @media #{$media-query-tablet} {
    &__wrapper {
    }

    &__menu {
      inset-block-start: 20px;
      inset-block-end: 20px;
      inset-inline-start: 20px;
      width: $app-menu-tablet-width;
      height: calc(100% - 40px);
    }

    &__main {
      padding-block-start: 20px;
      padding-inline-start: calc($app-menu-tablet-width + 40px);
    }
  }

  @media #{$media-query-desktop} {
    &__menu {
      width: $app-menu-desktop-width;
    }

    &__main {
      padding-inline-start: calc($app-menu-desktop-width + 40px);
    }
  }
}
</style>
