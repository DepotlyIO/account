<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import UiFormInput from '@/components/ui/form/Input.vue';

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

const props = defineProps<Props>();

const picker = useTemplateRef<HTMLInputElement>('picker');

const inputProps = computed(() => ({
  name: props.name,
  label: props.label,
  placeholder: props.placeholder,
  hint: props.hint,
  required: props.required,
  disabled: props.readonly,
  readonly: true,
  error: props.error,
  tabindex: props.tabindex,
}));

const showDatePicker = () => {
  picker.value.focus();
};

const model = defineModel<string>({ required: true });
</script>

<template>
  <section :class="$style['ui-form-date']">
    <UiFormInput v-bind="inputProps" @focus="showDatePicker" />

    <input ref="picker" v-model="model" type="date" :class="$style['ui-form-date__selector']" />
  </section>
</template>

<style module lang="scss">
.ui-form-date {
  &__selector {
    display: none;
  }
}
</style>
