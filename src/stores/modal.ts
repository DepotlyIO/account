import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ModalName } from '@/types/stores/modal';

export const useModalStore = defineStore('modal', () => {
  const modal_name = ref<ModalName>();

  const openModal = (name: ModalName) => {
    modal_name.value = name;
  };

  const closeModal = () => {
    modal_name.value = undefined;
  };

  return {
    modal_name,
    openModal,
    closeModal,
  };
});
