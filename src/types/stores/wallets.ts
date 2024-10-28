import type { WalletBalance } from '@/types/models/wallet';

export interface WalletCurrency extends WalletBalance {
  address: string;
}
