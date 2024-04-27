import { ref, computed } from 'vue';

const size = ref(window.innerWidth);

window.addEventListener('resize', () => {
  size.value = window.innerWidth;
});

export const useScreenSize = () => ({
  size,
  tablet: computed(() => size.value >= 768),
  desktop: computed(() => size.value >= 992),
});
