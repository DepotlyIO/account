<script setup lang="ts">
import { computed, useId } from 'vue';
import UiText from '@/components/ui/Text.vue';

interface Props {
  name: string;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const model = defineModel<boolean>({ required: true });

const id = useId();

const computedId = computed(() => `${props.name}_${id}`);
</script>

<template>
  <section :class="$style['ui-form-checkbox']">
    <input v-model="model" :id="computedId" :disabled="props.disabled" type="checkbox" />

    <UiText
      variant="underline"
      :for="computedId"
      tag="label"
      :class="$style['ui-form-checkbox__label']"
    >
      {{ props.label }}
    </UiText>
  </section>
</template>

<style module lang="scss">
.ui-form-checkbox {
  display: flex;
  align-content: center;
  gap: 0.5rem;

  &__label {
    cursor: pointer;
  }
}
</style>
