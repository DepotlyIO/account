import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/useApi';
import type { Wallet, Blockchain } from '@/types/models/wallet';
import type { WalletCurrency } from '@/types/stores/wallets';

export const useWalletsStore = defineStore('wallets', () => {
  const api = useApi();

  const wallets = ref<Wallet[]>([]);

  const walletsCurrencies = computed<WalletCurrency[]>(() =>
    wallets.value
      .map((wallet) =>
        wallet.balances.map((currency) => ({ address: wallet.address, ...currency })),
      )
      .flat(),
  );

  const loadWallets = async () => {
    const { data } = await api.wallets.list();
    wallets.value = data;
  };

  const createWallet = async (blockchain: Blockchain) => {
    const { data } = await api.wallets.create({ wallet: { blockchain } });
    wallets.value.push(data);
  };

  return {
    wallets,
    walletsCurrencies,
    loadWallets,
    createWallet,
  };
});
