import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';
import type { Wallet, Blockchain } from '@/types/models/wallet';

export const useWalletsStore = defineStore('wallets', () => {
  const api = useApi();

  const wallets = ref<Wallet[]>([]);

  const loadWallets = async () => {
    const { data } = await api.wallets.list();
    wallets.value = data;
  };

  const createWallet = async (blockchain: Blockchain) => {
    const { data } = await api.wallets.create({ wallet: { blockchain } });
    wallets.value.push(data);
  };

  return {
    loadWallets,
    createWallet,
  };
});
