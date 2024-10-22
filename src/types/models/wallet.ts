export type Blockchain = 'ethereum';

export interface Wallet {
  id: number;
  blockchain: Blockchain;
  account_index: number;
  address: string;
  balances: Record<string, string>[];
}

export interface WalletCreateData {
  wallet: {
    blockchain: Blockchain;
  };
}
