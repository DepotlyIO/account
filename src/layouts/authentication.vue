<script setup lang="ts"></script>

<template>
  <main :class="$style['layout-authentication']">
    <div :class="$style['layout-authentication__wrapper']">
      <slot />
    </div>
  </main>
</template>

<style module lang="scss">
.layout-authentication {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    max-width: calc(100dvw - 20px);
  }
}
</style>
