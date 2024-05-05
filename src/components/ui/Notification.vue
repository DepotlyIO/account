<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';
import type { MainIcon } from '@/types/assets/icons';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  icon?: MainIcon;
  title?: string;
  content?: string;
  closeable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  closeable: false,
});

const emit = defineEmits<{
  close: [value: void];
}>();

const style = useCssModule();

const computedClasses = computed(() => ({
  [style['ui-notification']]: true,
  [style[`ui-notification--variant-${props.variant}`]]: props.variant,
}));
</script>

<template>
  <section :class="computedClasses">
    <div v-if="props.title || $slots['title']" :class="$style['ui-notification__title']">
      <slot name="title">
        <UiText variant="h6" color="color-inherit">
          {{ props.title }}
        </UiText>
      </slot>
    </div>

    <div :class="$style['ui-notification__middle']">
      <div v-if="props.icon || $slots['icon']" :class="$style['ui-notification__icon']">
        <slot name="icon">
          <UiIcon v-if="props.icon" :name="props.icon" color="color-inherit" />
        </slot>
      </div>

      <div :class="$style['ui-notification__content']">
        <slot>
          <UiText color="color-inherit">
            {{ props.content }}
          </UiText>
        </slot>
      </div>

      <div v-if="closeable || $slots['actions']" :class="$style['ui-notification__actions']">
        <slot name="actions">
          <UiButton
            variant="text"
            size="small-compact"
            color="color-inherit"
            @click="emit('close')"
          >
            <UiIcon name="close" color="color-inherit" size="1rem" />
          </UiButton>
        </slot>
      </div>
    </div>
  </section>
</template>

<style module lang="scss">
.ui-notification {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--notification-border-color);
  border-radius: 0.375rem;
  background-color: var(--notification-background-color);
  color: var(--notification-text-color);

  &--variant {
    &-primary {
      --notification-border-color: #9ec5fe;
      --notification-background-color: #cfe2ff;
      --notification-text-color: #052c65;
    }

    &-secondary {
      --notification-border-color: #c4c8cb;
      --notification-background-color: #e2e3e5;
      --notification-text-color: #2b2f32;
    }

    &-success {
      --notification-border-color: #a3cfbb;
      --notification-background-color: #d1e7dd;
      --notification-text-color: #0a3622;
    }

    &-danger {
      --notification-border-color: #f1aeb5;
      --notification-background-color: #f8d7da;
      --notification-text-color: #58151c;
    }

    &-warning {
      --notification-border-color: #ffe69c;
      --notification-background-color: #fff3cd;
      --notification-text-color: #664d03;
    }

    &-info {
      --notification-border-color: #9eeaf9;
      --notification-background-color: #cff4fc;
      --notification-text-color: #055160;
    }

    &-light {
      --notification-border-color: #e9ecef;
      --notification-background-color: #fcfcfd;
      --notification-text-color: #495057;
    }

    &-dark {
      --notification-border-color: #adb5bd;
      --notification-background-color: #ced4da;
      --notification-text-color: #495057;
    }
  }

  &__title {
    margin-block-end: 0.5rem;
  }

  &__middle {
    &_icon,
    &_content,
    &_actions {
      display: flex;
      align-items: center;
    }

    &_icon {
      margin-inline-end: 1rem;
    }

    &_content {
      &:not(:last-child) {
        margin-inline-end: 1rem;
      }
    }

    &_actions {
      margin-inline-start: auto;
    }
  }
}
</style>
