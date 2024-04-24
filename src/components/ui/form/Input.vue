<script setup lang="ts" generic="T">
import { computed, useCssModule } from 'vue';
import { useUuid } from '@/composables/useUuid';

const styles = useCssModule();
const uuid = useUuid();

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  autocomplete?: 'off' | 'email' | 'current-password' | 'new-password' | 'name';
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  autocomplete: 'off',
  required: false,
  disabled: false,
  readonly: false,
});

const model = defineModel<T>();

const id = computed(() => `${props.name}-${uuid}`);

const inputAttributes = computed(() => ({
  id: id.value,
  name: props.name,
  placeholder: props.placeholder,
  type: props.type,
  autocomplete: props.autocomplete,
  disabled: props.disabled,
  readonly: props.readonly,
  required: props.required,
  class: {
    [styles['ui-form-text__input']]: true,
  },
}));

const computedError = computed(() =>
  Array.isArray(props.error) ? props.error.join('; ') : props.error,
);
</script>

<template>
  <section :class="$style['ui-form-text']">
    <label v-if="props.label" :for="id" :class="$style['ui-form-text__label']">
      {{ props.label }}
    </label>

    <input v-model="model" v-bind="inputAttributes" />

    <div v-if="props.error" :class="$style['ui-form-text__error']">
      {{ computedError }}
    </div>
  </section>
</template>

<style module lang="scss">
.ui-form-text {
  width: 100%;
  @include children-margin-block(0.5rem);

  > * {
    display: block;
  }

  &__label {
    cursor: pointer;
  }

  &__input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid $color-border;
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;

    &:active,
    &:focus-visible {
      border-color: $color-border-active;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  }

  &__error {
    color: $color-red;
  }
}
</style>
