<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useUuid } from '@/composables/useUuid';

const styles = useCssModule();
const id = useUuid();

interface Props {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const computedId = computed(() => `${props.name}-${id}`);

const computedClasses = computed(() => ({
  [styles['ui-form-input']]: true,
}));
</script>

<template>
  <section :class="computedClasses">
    <label v-if="label" :for="computedId" :class="$style['ui-form-input__label']">
      {{ props.label }}
    </label>

    <input
      :id="computedId"
      :name="props.name"
      :label="props.label"
      :type="props.type"
      :class="$style['ui-form-input__input']"
    />
  </section>
</template>

<style module lang="scss">
.ui-form-input {
  &__label {
  }

  &__input {
  }
}
</style>
