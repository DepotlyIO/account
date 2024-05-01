<script setup lang="ts"></script>

<template>
  <section :class="$style['ui-card']">
    <slot />
  </section>
</template>

<style module lang="scss">
.ui-card {
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid $color-border;
  background: $color-white;
}
</style>
