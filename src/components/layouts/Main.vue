<script setup lang="ts">
import AppMenu from '@/components/app/Menu.vue';
</script>

<template>
  <div :class="$style['layout-default']">
    <div :class="$style['layout-default__wrapper']">
      <main :class="$style['layout-default__main']">
        <slot />
      </main>

      <AppMenu :class="$style['layout-default__menu']" />
    </div>
  </div>
</template>

<style module lang="scss">
.layout-default {
  &__wrapper {
    height: 100dvh;
    max-height: 100dvh;
    display: grid;
    grid-template-areas:
      'main main'
      'menu menu';
  }

  &__menu {
    grid-area: menu;
    height: $app-menu-mobile-height;
  }

  &__main {
    grid-area: main;
    height: calc(100dvh - $app-menu-mobile-height);
  }

  @media #{$media-query-tablet} {
    &__wrapper {
      grid-template-areas:
        'menu main'
        'menu main';
    }
  }
}
</style>
