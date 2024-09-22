<script setup lang="ts">
import { computed, useId, useCssModule } from 'vue';
import UiText from '@/components/ui/Text.vue';

interface Props {
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

const model = defineModel<string>({ required: true });

const styles = useCssModule();
const id = useId();

const computedId = computed(() => `${props.name}-${id}`);

const inputAttributes = computed(() => ({
  id: computedId.value,
  name: props.name,
  placeholder: props.placeholder,
  type: 'date',
  disabled: props.disabled,
  readonly: props.readonly,
  required: props.required,
  tabindex: props.tabindex,
  class: {
    [styles['ui-form-date__input']]: true,
  },
}));

const computedError = computed(() =>
  Array.isArray(props.error) ? props.error.join('; ') : props.error,
);
</script>

<template>
  <section :class="$style['ui-form-date']">
    <div :class="$style['ui-form-date__head']">
      <UiText
        variant="underline"
        :for="computedId"
        tag="label"
        :class="$style['ui-form-date__head_label']"
      >
        {{ props.label }}
      </UiText>

      <div v-if="$slots['label']" :class="$style['ui-form-date__head_label-slot']">
        <slot name="label" />
      </div>
    </div>

    <input v-model="model" v-bind="inputAttributes" />

    <UiText v-if="props.error" variant="underline" color="color-red">
      {{ computedError }}
    </UiText>

    <UiText v-if="props.hint" variant="underline" color="color-gray">
      {{ props.hint }}
    </UiText>
  </section>
</template>

<style module lang="scss">
.ui-form-date {
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
}
</style>
