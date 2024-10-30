<script setup lang="ts">
import { computed, watch, useTemplateRef, defineAsyncComponent } from 'vue';
import { useModalStore } from '@/stores/modal';
import UiIcon from '@/components/ui/Icon.vue';
import { ModalName } from '@/types/stores/modal';

const modalStore = useModalStore();

const dialog = useTemplateRef('dialog');

const component = computed(() => {
  switch (modalStore.modal_name) {
    case ModalName.CREATE_WALLET:
      return defineAsyncComponent(() => import('@/components/modal/CreateWallet.vue'));
    case ModalName.WALLET_REQUIRED:
      return defineAsyncComponent(() => import('@/components/modal/WalletRequired.vue'));
    default:
      return undefined;
  }
});

const close = () => {
  modalStore.closeModal();
};

const handleClickEvent = (event: MouseEvent) => {
  if (event.target === dialog.value) close();
};

watch(
  () => modalStore.modal_name,
  (newValue) => {
    if (!dialog.value) return;

    if (newValue) {
      dialog.value.showModal();
      dialog.value.addEventListener('mousedown', handleClickEvent);
    } else {
      dialog.value.close();
      dialog.value.removeEventListener('mousedown', handleClickEvent);
    }
  },
);
</script>

<template>
  <dialog ref="dialog" :class="$style['app-modal']" @close="close">
    <Transition
      :enter-active-class="$style['inner-transition-enter-active']"
      :leave-active-class="$style['inner-transition-leave-active']"
      :enter-from-class="$style['inner-transition-enter-from']"
      :enter-to-class="$style['inner-transition-enter-to']"
      :leave-to-class="$style['inner-transition-leave-to']"
    >
      <div v-if="component" :class="$style['app-modal__inner']">
        <UiIcon name="close" size="30" :class="$style['app-modal__inner_close']" @click="close" />

        <component :is="component" />
      </div>
    </Transition>
  </dialog>
</template>

<style module lang="scss">
.app-modal {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border: none;
  background: $color-transparent;
  animation: dialog-close $duration-medium forwards;
  transition:
    display $duration-medium allow-discrete,
    overlay $duration-medium allow-discrete;

  &[open] {
    animation: dialog-open $duration-medium forwards;
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 50px 15px 15px;
    background: $color-white;
    z-index: 100;

    &_close {
      position: absolute;
      inset-block-start: 15px;
      inset-inline-end: 15px;
      cursor: pointer;
    }
  }

  &:has(.inner-transition-enter-to, .inner-transition-leave-to) {
    overflow: visible;
  }

  .inner-transition {
    &-enter-active,
    &-leave-active {
      transition:
        opacity $duration-medium ease,
        transform $duration-medium ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateY(50px);
    }
  }

  @keyframes dialog-open {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dialog-close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @media #{$media-query-tablet} {
    max-width: 550px;
    max-height: calc(100% - 40px);
    width: 100%;
    height: fit-content;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);

    &__inner {
      height: fit-content;
      padding: 50px;
      border-radius: 20px;
    }
  }
}
</style>
