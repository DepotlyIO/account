<script setup lang="ts" generic="T">
import { computed, useId, useCssModule } from 'vue';
import UiText from '@/components/ui/Text.vue';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  autocomplete?: 'off' | 'email' | 'current-password' | 'new-password' | 'name';
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | string[];
  tabindex?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  autocomplete: 'off',
  required: false,
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  focus: [value: void];
}>();

const model = defineModel<T>();

const styles = useCssModule();
const id = useId();

const computedId = computed(() => `${props.name}-${id}`);

const inputAttributes = computed(() => ({
  id: computedId.value,
  name: props.name,
  placeholder: props.placeholder,
  type: props.type,
  autocomplete: props.autocomplete,
  disabled: props.disabled,
  readonly: props.readonly,
  required: props.required,
  tabindex: props.tabindex,
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
    <div :class="$style['ui-form-text__head']">
      <UiText
        variant="underline"
        :for="computedId"
        tag="label"
        :class="$style['ui-form-text__head_label']"
      >
        {{ props.label }}
      </UiText>

      <div v-if="$slots['label']" :class="$style['ui-form-text__head_label-slot']">
        <slot name="label" />
      </div>
    </div>

    <input v-model="model" v-bind="inputAttributes" @focus="() => emit('focus')" />

    <UiText v-if="props.error" variant="underline" color="color-red">
      {{ computedError }}
    </UiText>

    <UiText v-if="props.hint" variant="underline" color="color-gray">
      {{ props.hint }}
    </UiText>
  </section>
</template>

<style module lang="scss">
.ui-form-text {
  width: 100%;
  @include children-margin-block(0.25rem);

  > * {
    display: block;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_label {
      cursor: pointer;

      &-slot {
        margin-inline-start: auto;
      }
    }
  }

  &__input {
    width: 100%;
    height: 2.375rem;
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

    &[type='number'] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
