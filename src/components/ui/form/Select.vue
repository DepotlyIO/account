<script setup lang="ts" generic="T">
import { computed, useId, useCssModule } from 'vue';
import UiText from '@/components/ui/Text.vue';

export interface UiFormSelectOption {
  text: string;
  value: string;
}

interface Props {
  options: UiFormSelectOption[];
  name: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | string[];
  tabindex?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  readonly: false,
});

const model = defineModel<T>();

const styles = useCssModule();
const id = useId();

const computedId = computed(() => `${props.name}-${id}`);

const inputAttributes = computed(() => ({
  id: computedId.value,
  name: props.name,
  placeholder: props.placeholder,
  disabled: props.disabled,
  readonly: props.readonly,
  required: props.required,
  tabindex: props.tabindex,
  class: {
    [styles['ui-form-select__input']]: true,
  },
}));

const computedError = computed(() =>
  Array.isArray(props.error) ? props.error.join('; ') : props.error,
);
</script>

<template>
  <section :class="$style['ui-form-select']">
    <div :class="$style['ui-form-select__head']">
      <UiText
        variant="underline"
        :for="computedId"
        tag="label"
        :class="$style['ui-form-select__head_label']"
      >
        {{ props.label }}
      </UiText>

      <div v-if="$slots['label']" :class="$style['ui-form-select__head_label-slot']">
        <slot name="label" />
      </div>
    </div>

    <select v-model="model" v-bind="inputAttributes">
      <option disabled value="">{{ props.placeholder }}</option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <div v-if="props.error" :class="$style['ui-form-select__error']">
      {{ computedError }}
    </div>

    <UiText v-if="props.hint" variant="underline" color="color-gray">
      {{ props.hint }}
    </UiText>
  </section>
</template>

<style module lang="scss">
.ui-form-select {
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
  }

  &__error {
    color: $color-red;
  }
}
</style>
