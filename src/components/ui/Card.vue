<script setup lang="ts">
import UiText from '@/components/ui/Text.vue';

interface Props {
  title?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section :class="$style['ui-card']">
    <UiText v-if="props.title" variant="h5" :class="$style['ui-card__title']">
      {{ props.title }}
    </UiText>

    <div>
      <slot />
    </div>
  </section>
</template>

<style module lang="scss">
.ui-card {
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid $color-border;
  background: $color-white;

  &__title {
    margin-block-end: 0.5rem;
  }
}
</style>
