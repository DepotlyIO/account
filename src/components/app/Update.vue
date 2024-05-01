<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import UiNotification from '@/components/ui/Notification.vue';
import UiButton from '@/components/ui/Button.vue';

const { needRefresh, updateServiceWorker } = useRegisterSW();
</script>

<template>
  <Transition name="slide-down">
    <div v-if="needRefresh" :class="$style['app-update']">
      <div :class="$style['app-update__inner']">
        <UiNotification :content="$t('labels.app_update_available')" icon="update">
          <template #actions>
            <UiButton @click="updateServiceWorker">
              {{ $t('actions.update') }}
            </UiButton>
          </template>
        </UiNotification>
      </div>
    </div>
  </Transition>
</template>

<style module lang="scss">
.app-update {
  display: grid;
  grid-template-rows: 1fr;

  &.slide-down {
    &-enter-active,
    &-leave-active {
      transition: grid-template-rows $duration-fast ease-out;
    }

    &-enter-from,
    &-leave-active {
      grid-template-rows: 0fr;
    }
  }

  &__inner {
    overflow: hidden;
  }
}
</style>
