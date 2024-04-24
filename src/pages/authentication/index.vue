<script setup lang="ts"></script>

<template>
  <main :class="$style['page-authentication']">
    <div :class="$style['page-authentication__wrapper']">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style module lang="scss">
.page-authentication {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    min-width: 350px;
    max-width: calc(100dvw - 20px);
  }
}
</style>
