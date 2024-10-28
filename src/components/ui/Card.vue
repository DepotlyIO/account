<script setup lang="ts">
import UiText from '@/components/ui/Text.vue';

interface Props {
  title?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section :class="$style['ui-card']">
    <div v-if="props.title || $slots['header-end']" :class="$style['ui-card__header']">
      <UiText variant="h5">
        {{ props.title }}
      </UiText>

      <div v-if="$slots['header-end']">
        <slot name="header-end" />
      </div>
    </div>

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

  &__header {
    display: flex;
    justify-content: space-between;
    margin-block-end: 0.5rem;
  }
}
</style>
